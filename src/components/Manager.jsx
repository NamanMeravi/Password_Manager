
import React from "react";
import { useRef, useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';

function Manager() {
  const ref = useRef();
  const passwordref = useRef();
  const copy = useRef();
  const [form, setform] = useState({ site: " ", username: " ", password: " " });
  const [passwordArray, setPasswordArray] = useState([]);

  const getPasswords = async()=>{
    let req = await fetch("http://localhost:3000/")
    let passwords = await req.json()
  
    console.log(passwords);
      setPasswordArray(passwords);
    

  }

  useEffect(() => {
    getPasswords()
  
  }, []);

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    alert("copy to clipboard" + text);
  };

  const showPassword = () => {
    if (passwordref.current.type === "password") {
      passwordref.current.type = "text";
    } else {
      passwordref.current.type = "password";
    }
  };

  const SavePassword = async() => {
    let res  =await fetch ("http://localhost/3000/", {method:"POST", headers: {"content-type": "application/json"},body:JSON.stringify({id:form.id})})
    setPasswordArray([...passwordArray, {...form, id:uuidv4()}]);
  /*  localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form, id:uuidv4()}]));
    console.log([...passwordArray, form]);*/
  };
  const DeletePassword = async(id) => {
   console.log("deleting the password with id",id);
   setPasswordArray(passwordArray.filter(item=>item.id!=id))
   //localStorage.setItem("passwords",JSON.stringify([...passwordArray.filter(item=>item.id!=id)]))
   let res  =await fetch ("http://localhost/3000/", {method:"DELETE", headers: {"content-type": "application/json"},body:JSON.stringify({...form, id})})
      
  };

  const EditPassword = (id)=>{

    console.log("Editing Password with id",id)

    setform({...passwordArray.filter(i=>i.id===id)[0],id:id})

    setPasswordArray(passwordArray.filter(item=>item.id!=id))
   
  }

  const handlechange = (e) => {
    setform({ ...form, [e.target.name]: [e.target.value] });
  };

  return (
    <>
      <div className="absolute inset-0 -z-10 h-full w-full bg-green-300 [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>

      <div className=" px-2 md:px-3 md: mycontainer">
        <h1 className="text-4xl font-bold text-center ">
          {" "}
          <span className="text-green-700">/&lt;</span>
          PassOp
          <span className="text-green-700"> /&gt;</span>
        </h1>
        <p className="text-center">Your own Password Manager</p>

        <div className=" flex flex-col p-4 items-center">
          <input
            className="rounded-full border border-green-900 text-black w-full p-4 py-1"
            type="text"
            name="site"
            id="site"
            placeholder="Enter URL"
            value={form.site}
            onChange={handlechange}
          />
          <div className="flex w-full  gap-36 py-4 ">
            <input
              className="rounded-full border border-green-900 text-black w-full p-4 py-1 "
              type="text"
              name="username"
              id="username"
              placeholder="Enter Username"
              value={form.username}
              onChange={handlechange}
            />
            <div className="relative">
              <input
                className="rounded-full border border-green-900 text-black w-full p-4 py-1"
                type="password"
                name="password"
                ref={passwordref}
                id="password"
                placeholder="Enter Password"
                value={form.password}
                onChange={handlechange}
              />
              <span className="absolute right-[1px] top-[3px] cursor-pointer ">
                <div className="flex hi" onClick={showPassword} ref={ref}>
                  <lord-icon
                    src="https://cdn.lordicon.com/kkiecexg.json"
                    trigger="hover"
                    state="hover-look-around"
                  ></lord-icon>
                </div>
              </span>
            </div>
          </div>

          <button
            onClick={SavePassword}
            className="flex justify-center items-center gap-2 px-2 bg-green-500 rounded-full py-2 w-fit hover:bg-green-300 font-bold  "
          >
            <lord-icon
              src="https://cdn.lordicon.com/hqymfzvj.json"
              trigger="hover"
            ></lord-icon>
            Save Password
          </button>
        </div>
        <div className="passwords">
          <h2 className=" font-bold text-2xl py-4 ">Your Passwords</h2>
          {passwordArray.length === 0 && <div> No password to show </div>}
          {passwordArray.length != 0 && (
            <div>
              {" "}
              <table className="table-auto w-full bg-green-100  text-black rounded-md overflow-hidden">
                <thead className=" bg-green-800 text-white ">
                  <tr>
                    <th className=" py-2">Site</th>
                    <th className=" py-2">Username</th>
                    <th className=" py-2">Password</th>
                    <th className=" py-2">Action</th>
                  
                  </tr>
                </thead>
                <tbody className=" bg-green-100">
                  {passwordArray.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td
                          className=" py-2 text-center justify-center w-32 lordiconcopy "
                          onClick={() => {
                            copyText(item.site);
                          }}
                        >
                          {item.site}

                          <lord-icon
                            src="https://cdn.lordicon.com/lyrrgrsl.json"
                            trigger="hover"
                            style={{
                              width: "25px",
                              height: "25px",
                              "pL": "3px",
                              "pT": "3px",
                            }}
                          ></lord-icon>
                        </td>
                        <td
                          className="py-2 text-center w-32 lordiconcopy "
                          onClick={() => {
                            copyText(item.username);
                          }}
                        >
                          {item.username}
                          <lord-icon
                            src="https://cdn.lordicon.com/lyrrgrsl.json"
                            trigger="hover"
                            style={{
                              width: "25px",
                              height: "25px",
                             "pL": "3px",
                              "pT": "3px",
                            }}
                          ></lord-icon>
                        </td>
                        <td
                          className=" py-2 text-center w-32 lordiconcopy "
                          onClick={() => {
                            copyText(item.password);
                          }}
                        >
                          {item.password}
                          <lord-icon
                            src="https://cdn.lordicon.com/lyrrgrsl.json"
                            trigger="hover"
                            style={{
                              width: "25px",
                              height: "25px",
                              "pL": "3px",
                              "pT": "3px",
                            }}
                          ></lord-icon>
                        </td>
                        <td className=" py-2 text-center w-32   ">
                          <span className=" font-bold mx-2 cursor-pointer " onClick={()=>{EditPassword(item.id)}}>Edit</span>
                          <span className=" font-bold mx-2 cursor-pointer" onClick={()=>{DeletePassword(item.id)}}>Delete</span>
                        </td>
                        
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Manager;
