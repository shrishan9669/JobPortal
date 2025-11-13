import { Router } from "express";
import nodemailer from "nodemailer";
import crypto from "crypto";
import { OAuth2Client } from "google-auth-library";
import { signJwt } from "./utils/jwt.js";

import {prisma} from './Prisma/client.js'
import { requireAuth, type AuthRequest } from "./middleware/auth.js";
const userRouter = Router();





userRouter.post('/UserCreate',async(req:any,res:any)=>{
    const body = req.body;
    console.log(body)

    if(!body.name || !body.email || !body.phone || !body.password || !body.location || !body.experience){
        return res.status(500).json({
            msg:"All fields are required!!"
        })

    }

    try{
     const exists = await prisma.user.findUnique({
        where:{
            email:body.email
        }
     })

      if(exists){
        return res.json({
            msg:"User Already exists!!"
        })
      }


      const NewUser = await prisma.user.create({
        data:{
        name:body.name,
        email:body.email,
        phone:body.phone,
        password:body.password,
        experience:body.experience,
        location:body.location
      }
      })

      console.log(NewUser)

      return res.json({
        NewUser,msg:"User created."
      })
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            error:err
        })
    }


})

userRouter.get('/Signin',async(req:any,res:any)=>{
  const {emailid,password} = req.query;

  console.log(emailid + password)
  
  if(!emailid || !password){
    return res.json("One of the fields is missing!!");
  }

  try{
    
    const IsReal = await prisma.user.findUnique({
       where:{
        email:emailid,
        password:password
       }
    })

     if (!IsReal) {
        // ❌ User exists nahi → error response
        return res.status(404).json({ error: "User doesn't exist",exist:false });
        }


         // 3️⃣ User exists → login successful
        const jwtToken = signJwt({ id: IsReal.id, email: IsReal.email });
        console.log("This is jwt token " + jwtToken)
        //removing the cookie logic 

        //  res.cookie("token", jwtToken, {
        //   httpOnly: true,
        //   secure: process.env.NODE_ENV === "production",
        //   sameSite: "lax",
        //   maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        // });


    return res.json({
      exist:true,
      name:IsReal.name,
      email:IsReal.email,
      token:jwtToken
    })

  }
  catch(err){
     console.log(err)
     return res.status(500).json({
      error:err
     })
  }
})

userRouter.get("/forgetLogin",async(req:any,res:any)=>{
  const {email} = req.query;

  console.log(email);

  if(!email){
    return res.status(500).json({
      msg:"Email required!!"
    })
  }

  try{
     const exist = await prisma.user.findUnique({
      where:{
        email:email
      }
     })

     if(exist){
      return res.json({
        real:true
      })
     }
  }
  catch(err){
    console.log(err);
    return res.status(500).json({
      error:err
    })
  }
})

userRouter.put('/changePassword',async(req:any,res:any)=>{
  const {newpass,email} = req.body;
  console.log("Newpass and email" + email + " " + newpass);
  if(!newpass || !email){
    return res.json({
      msg:"Newpass and email are required!!"
    })
  }

  try{
     const Changing = await prisma.user.update({
      where:{
        email:email
      },
      data:{
        password:newpass
      }
     })

     console.log(Changing);
     return res.json({
      msg:"Password changed!!"
     })
  }
  catch(err){
    console.log(err);
    res.status(500).json({
      error:err
    })
  }
})


// Sending An otp


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "bpguna11@gmail.com",  // 👈 your Gmail
    pass: "tcpd eouy gqkz tnfq",     // 👈 not your real password (see below)
  },
});

userRouter.get("/sendOtp",async(req:any,res:any)=>{
  const {email} = req.query;
  const otp = crypto.randomInt(100000, 999999); // generate 6-digit OTP

  console.log(email);

  if(!email){
    return res.status(500).json({
      msg:"Email required!!"
    })
  }

  try{
     const exist = await prisma.user.findUnique({
      where:{
        email:email
      }
     })

     if(!exist){
        return res.json({
          real:false
        })
     }

     const mailOptions = {
        from: `"YuvaJobs" ${"bpguna11@gmail.com"} `,
        to: email,
        subject: "Your OTP Code",
        html: `<p>Your OTP is <b>${otp}</b>. It will expire in 5 minutes.</p>`,
    };

    await transporter.sendMail(mailOptions);

    res.json({
      real:true,
      otp
    })
  }
  catch(err){
    console.log(err);
    return res.status(500).json({
      error:err
    })
  }
})

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

userRouter.post('/google-login',async(req:any,res:any)=>{
  try{
    
    const {token} = req.body ; // token is Google id_token from frontend
      if (!token) return res.status(400).json({ error: "id_token missing" });

      // verify token with google

      const ticket = await client.verifyIdToken({
        idToken:token,
        audience:process.env.GOOGLE_CLIENT_ID || ""
      })

      const payload = ticket.getPayload();
      console.log("Here is your payload " + payload);

      if(!payload) return req.status(401).json({error:"Invalid google token"});

      const email = payload.email
      


      if (!email) return res.status(400).json({ error: "Email not available in token" });


      // check existing user by email

      let user = await prisma.user.findUnique(
        {
          where:{
          email:email
        }
        }
      )


         if (!user) {
        // ❌ User exists nahi → error response
        return res.status(404).json({ error: "User doesn't exist" });
        }


         // 3️⃣ User exists → login successful
        const jwtToken = signJwt({ id: user.id, email: user.email });
        console.log("This is jwt token " + jwtToken);
        //  res.cookie("token", jwtToken, {
        //   httpOnly: true,
        //   secure: process.env.NODE_ENV === "production",
        //   sameSite: "lax",
        //   maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        // });

        return res.json({ok:true,name:user.name,email:user.email,token:jwtToken});

  }
  catch (err:any) {
    console.error("Google login error:", err);
    return res.status(500).json({ error: "Authentication failed" });
  }

  
})


userRouter.post("/logout", (req:any, res:any) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
  res.json({ ok: true });
});


userRouter.get('/BasicDetails',requireAuth,async(req:any,res:any)=>{
      const {id} = req.user;
      console.log(req.user);

      if(!id){
        return res.json({
          msg:"Id not found!!"
        })
      }

      try{
             const User = await prisma.user.findUnique({
              where:{
                id:id
              }
             })

             return res.json({
              ok:true,
              user:User
             })
      }
      catch(err){
        console.log(err);
        return res.status(500).json({
          error:err
        })
      }
})


userRouter.post('/disability',requireAuth,async(req:any,res:any)=>{
  const {disability,email} = req.body;
  if(!disability || !email){
    return res.json({
      msg:"Data required!!"
    })
  }

  try{
     await prisma.user.update({
      where:{
        email:email
      },
      data:{
        disability:disability
      }
    })

    return res.json({
      ok:true
    })
  }
  catch(err){
    console.log(err);
    return res.status(500).json({
      error:err
    })
  }
})

userRouter.get('/getDisability',requireAuth,async(req:any,res:any)=>{
  const email = req.query.email;
  if(!email){
    return res.json({
      msg:"Email required to get disability"
    })
  }

  try{
       const Got = await prisma.user.findUnique({
        where:{
          email:email
        }
       })

       return res.json({
        disability:Got?.disability,
        militaryExp:Got?.militaryExp,
        careerBreak:Got?.careerBreak
       })
  }
  catch(err){
    console.log(err);
    return res.status(500).json({
      error:err
    })
  }
})

userRouter.put('/setDiversity',requireAuth,async(req:any,res:any)=>{
    const {militaryExp,careerBreak,email} = req.body;
    if(!militaryExp || !careerBreak || !email){
      return res.json({
        msg:"All fields are required!!"
      })
    }

    try{
          await prisma.user.update({
               where:{
                email:email
               },
               data:{
                militaryExp,careerBreak
               }
          })

          return res.json({
            ok:true
          })
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
          error:err
        })
    }
})


// Getting textual Content
userRouter.put('/ProfileSummary',requireAuth,async(req:any,res:any)=>{
  const {Data,email} = req.body;
  if(!Data || !email){
    return res.json({
      msg:"Didn't get Data"
    })
  }
  try{

    await prisma.user.update({
         where:{
          email:email
         },
         data:{
          profileSummary:Data
         }
    })

    return res.json({
      ok:true
    })

  }
  catch(err){
    console.log(err);
    return res.status(500).json({
      error:err
    })
  }
})
userRouter.put('/ResumeHeadline',requireAuth,async(req:any,res:any)=>{
  const {Data,email} = req.body;
  if(!Data || !email){
    return res.json({
      msg:"Didn't get Data"
    })
  }
  try{

    await prisma.user.update({
         where:{
          email:email
         },
         data:{
          resumeHeadline:Data
         }
    })

    return res.json({
      ok:true
    })

  }
  catch(err){
    console.log(err);
    return res.status(500).json({
      error:err
    })
  }
})

// Getting Reusable Div Data

userRouter.get('/Summary',requireAuth,async(req:any,res:any)=>{
  
  const {email} = req.query;
  if(!email){
     return res.json({
      msg:"Didn't get Data"
    })
  }

  try{
    const Data = await prisma.user.findUnique({
      where:{
        email:email
      },
      select:{
        profileSummary:true
      }
    })

    return res.json({
      ok:true,
      Data:Data?.profileSummary
    })
  }
  catch(err){
    console.log(err);
    return res.json({
      error:err
    })
  }
})

userRouter.get('/continuous',async(req:any,res:any)=>{
  const user = await prisma.user.findUnique({
    where:{
      email:"bpguna11@gmail.com"
    },
    select:{
      id:true
    }
  })
  return res.json({
    ok:true,
    user
  })
})

userRouter.get('/resume_headline',requireAuth,async(req:any,res:any)=>{
   const {email} = req.user;
   if(!email){
    return res.json({
      msg:"Required email"
    })
   }
  
   try{
      const User = await prisma.user.findUnique({
        where:{
          email:email
        },
        select:{
          resumeHeadline:true
        }
      })

      return res.json({
        ok:true,
        headline:User?.resumeHeadline
      })
   }
   catch(err){
    console.log(err);
    return res.json({
      error:err
    })
   }
})

userRouter.get('/getKeySkills',requireAuth,async(req:any,res:any)=>{
  const  {id} = req.user;
  if(!id){
    return res.json({
      msg:"Id required!!"
    })
  }

  try{
     const Data = await prisma.keySkills.findUnique({
      where:{
        userKeyId:Number(id)
      },
      select:{
        skillSet:true
      }
    })

    console.log(Data);
    return res.json({
      ok:true,
      skills:Data?.skillSet || []
    })

  }
  catch(err){
    console.log(err);
    return res.status(500).json({
      error:err
    })
  }
})


userRouter.post('/postKeySkills',requireAuth,async(req:any,res:any)=>{
    
   const {id} = req.user;
   const {skills} = req.body
   if(!id || !skills || !Array.isArray(skills)){
    return res.json({
      msg:"Id required!!"
    })
   }

   try{
       
    //check if it exists already

    const Exist = await prisma.keySkills.findUnique({
      where:{
        userKeyId:Number(id)
      }
    })

    let result;


    if(Exist){
     result =  await prisma.keySkills.update({
        where:{
          userKeyId:Number(id)
        },
        data:{
          skillSet:skills
        }
      })
    }

    else{
     result =  await prisma.keySkills.create({
        data:{
          userKeyId:Number(id),
          skillSet:skills
        }
      })
    }


    return res.json({
      msg:Exist ? 'Skills updated successfully':'Skills added successfully',
      data:result,
      ok:true
    })

   }
   catch(err){
    console.log(err);
    return res.status(500).json({
      error:err
    })
   }
})


userRouter.post('/postPersonalDetails',requireAuth,async(req:any,res:any)=>{
  const {id} = req.user;

  const FinalData = req.body.finalData;

  if(!id){
    return res.json({
      msg:"Id required!!"
    })
  }
  try{

    // 🧩 Convert date from frontend to JS Date object (if exists)
    let parsedDate: Date | null = null;
    if (FinalData.dateOfBirth) {
      // If frontend sends something like { date: "10", month: "07", year: "2003" }
      const { date, month, year } = FinalData.dateOfBirth;
      if (date && month && year) {
        parsedDate = new Date(`${year}-${month}-${date}`);
      }
    }


    // check if entry exist or not 

    const ExistPersonal = await prisma.userPersonalDetails.findUnique({
      where:{
        userId:Number(id)
      }
    })


    if(ExistPersonal){

      await prisma.userPersonalDetails.update({
        where:{
          userId:Number(id)
        },
        data:{
            gender:FinalData.gender || null,
            category:FinalData.category || null,
            maritalStatus:FinalData.maritalStatus || null,
            moreInfo:FinalData.moreInfo || [],
            permanentAddress:FinalData.parmanentAddress || null,
            hometown:FinalData.hometown || null,
            pincode:FinalData.pincode || null,
            dateofBirth:parsedDate
        }
      })
    }
    else {
      await prisma.userPersonalDetails.create({
        data:{
          userId:Number(id),
            gender:FinalData.gender || "",
            category:FinalData.category || "",
            maritalStatus:FinalData.maritalStatus || "",
            moreInfo:FinalData.moreInfo || [],
            permanentAddress:FinalData.parmanentAddress || "",
            hometown:FinalData.hometown || "",
            pincode:FinalData.pincode || ""
        }
      })
    }


    if(FinalData.languageArr && Array.isArray(FinalData.languageArr)){
 

        // Delete previous languages to avoid duplicates
      await prisma.languageProficiency.deleteMany({
        where: { userDetailId: Number(ExistPersonal?.id) },
      });

      await Promise.all(
        FinalData.languageArr.map(async(element:any) => {
             await prisma.languageProficiency.create({
                  data:{
                    userDetailId:Number(ExistPersonal?.id),
                    language:element.language || null,
                    proficiency:element.proficiency || null,
                    canRead:element.ableArray.includes('Read') ? true:false,
                    canWrite:element.ableArray.includes('Write') ? true:false,
                    canSpeak:element.ableArray.includes('Speak') ? true:false,
                  } 
             })
        })
      )
      
       
    }

    return res.json({
      ok:true,
      msg:"Personal details saved successfully ✅"
    })
     
  }
  catch(err){
    console.log(err);
    return res.status(500).json({
      error:err
    })
  }
})

userRouter.get("/getPersonalDetails",requireAuth,async(req:any,res:any)=>{
  const {id} = req.user;
  if(!id){
    return res.json({
      msg:"Id is required!!"
    })
  }


  try{
     const Personal = await prisma.userPersonalDetails.findUnique({
      where:{
        userId:Number(id)
      }
     })

     const Language = await prisma.languageProficiency.findMany({
      where:{
        userDetailId:Number(Personal?.id)
      }
     })
     console.log("Language array -> " + Language)


     return res.json({
      data:{Language,Personal}
     })
  }
  catch(err){
    console.log(err);
    return res.json({
      error:err
    })
  }
})

userRouter.post("/IT_Skills",requireAuth,async(req:any,res:any)=>{
  const {id} = req.user;
  
  if(!id){
    return res.json({
      msg:"Id is required!!"
    })
  }
 
  const {skill,version,lastused,expYears,expMonths,rowId} = req.body;
  if(!skill){
    return res.json({
      msg:"Skill required!!"
    })
  }


  try{

    if(rowId){
      await prisma.iTSkills.update({
        where:{
          id:Number(rowId)
        },
        data:{
          skill:skill,
          lastused:lastused || "",
          version:version || "",
          expMonths:expMonths || "",
          expYears:expYears || ""
        }
        
      })

      return res.json({
        ok:true,
        msg:"Skill updated successfully!!"
      })
    }
    
    // When skill/software already exist
    const Exist = await prisma.iTSkills.findFirst({
      where:{
        userKeyId:Number(id),
        skill:skill
      }
    })

    if(Exist){
      return res.json({
        msg:`Skill ${skill} already exists!!`
      })
    }

    await prisma.iTSkills.create({
      data:{
        userKeyId:Number(id),
        skill:skill,
        lastused:lastused || "",
        version:version || "",
        expMonths:expMonths || "",
        expYears:expYears || ""
      }
    })

    return res.json({
      ok:true,
      msg:"Skill added successfully"
    })
    
  }
  catch(err){
    console.log(err);

    return res.status(500).json({
      error:err
    })
  }
})
userRouter.get('/getItSkills',requireAuth,async(req:any,res:any)=>{
     const {id} = req.user;
     if(!id){
      return res.json({
        msg:"ID required"
      })
     }

     try{
        const AllSkills = await prisma.iTSkills.findMany({
          where:{
            userKeyId:Number(id)
          }
        })

        return res.json({
          ok:true,
          AllSkills
        })
     }
     catch(err){
      console.log(err);
      return res.status(500).json({
        error:err
      })
     }
})


userRouter.post('/postEmployment',requireAuth,async(req:any,res:any)=>{
  const {id} = req.user;
  if(!id){
    return res.json({
      msg:"ID required!!"
    })
  }

const {salary,totalExp,joiningDate,tillDate,profile,department,companyName,jobTitle,notice,skills} = req.body;


   try{
     await prisma.employment.create({
        data:{
          userKeyId:Number(id),
          skills:skills,
          company:companyName,
          jobTitle:jobTitle,
          totalExpMonth:String(totalExp.months),
          totalExpYear:String(totalExp.years),
          joinMonth:String(joiningDate.months),
          joinYear:String(joiningDate.years),
          tillMonth:String(tillDate.months),
          tillYear:String(tillDate.years),
          salary:salary,
          department:department,
          jobProfile:profile,
          noticePeriod:notice
          

        }
      })

      return res.json({
          ok:true,
          msg:"Employee data created successfully!!"
      })

   }
   catch(err){
    console.log(err);
    return res.json({
      error:err
    })
   }

  

  
})

userRouter.post('/postEducation',requireAuth,async(req:any,res:any)=>{

   const {id} = req.user;
  if(!id){
    return res.json({
      msg:"ID required!!"
    })
  }

  const {education,medium,board,gradingSystem,courseType,marks,passout,duration,course} = req.body;

  try{


    const exist = await prisma.education.findFirst({
      where:{
        education:education,
        userKeyId:Number(id)
      }
    })

    if(exist){
      return res.json({
        msg:`${education} details already exist for this user.`
      })
    }
    
     await prisma.education.create({
      data:{
        userKeyId:Number(id),
        education:education,
        marks:marks,
        courseType:courseType,
        course:course,
        passout:passout,
        medium:medium,
        board:board,
        gradingSystem:gradingSystem,
        startingCourse:duration.starting,
        endingCourse:duration.ending
      }
     })

     return res.json({
      ok:true,
      msg:"Education successfully created!!"
     })

  }
  catch(err){
    console.log(err);
    return res.json({
      error:err
    })
  }
})


export default userRouter