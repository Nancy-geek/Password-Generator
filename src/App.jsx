import { useState , useCallback, useEffect, useRef} from 'react'

import './App.css'
// import { useEffect } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setnumber] = useState(false)
  const [character, setCharacter] = useState(false)
  const [password, setPassword] = useState("")

  // PASSWORD GENERATOR FUNCTION
  const passwordGenerator = useCallback(()=>{
      let pass=""
      let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
      if(character) str+="!@#$%^&*()_}{|\:;/?><[]"
      if(numberAllowed) str+="123456789"

      for (let i = 0; i <length; i++) {
       let char= Math.floor(Math.random()*str.length +1 );
        pass+=str.charAt(char);
      }
      setPassword(pass)

    },
    [length, character, numberAllowed, setPassword ]           // setpassword (a function) is written here for optimisation
    // not password in dependencies as it will go in inifinite loop kyuki ek char ki bhi change hote hi pura password change ho raha 
    // used setpassword function here because jisse ye function be cache me loaded for better optimisation while using callback function 
/* By using the useCallback hook, we can create memoized functions and pass them as props to child components. This ensures that only the necessary child components are rendered and updated when specific actions occur, resulting in improved performanc */
    )
  
  useEffect(()=>{         // for particular time (dependency) hi render hona na ki bar bar 
    passwordGenerator()
  },
  [length, character, numberAllowed, passwordGenerator ])

  // using reference hook 
  const passwordref= useRef(null);

  // COPYING PASSWORD TO CLIPBOARD
   const copyPasswordToClipboard= useCallback(()=>{
    passwordref.current?.select();                          // using passwordref for optimising our code , to show the select line 
    passwordref.current?.setSelectionRange(0,20);

    window.navigator.clipboard.writeText(password)
   },[password])

  return (
    <>
      <h1 className='text-center , text-white text-5xl'>Password Generator</h1>
      <div className='  m-auto  border-gray-500 border-2 shadow-lg  rounded-md my-7 max-w-lg overflow-hidden'>
        
        <div className='outline-none flex overflow-hidden w-full '>
          <input
          type="text"
          value={password}
          placeholder='password'
          className='outline-none w-full py-2 px-2'
          readOnly
          ref={passwordref}
          /* ref for passing the reference of value in input as passwordref to implement the effect on */

           />

           <button className='bg-yellow-200 hover:bg-yellow-300 p-2 text-black border-black active:border-2  active:shadow-sm ' 
           onClick={copyPasswordToClipboard}
           >        
           
            Copy
           </button>
        </div>

        <div className='my-9 px-2  flex justify-evenly'>
          <div className='flex'>
            <input type="range" min={6} max={50} 
            value={length}
            className='cursor-pointer '
            onChange={(e)=> setLength(e.target.value) } />
            <label className='mx-1 text-white' > Length {length}</label>
          </div>

          <div className='flex'>
          <input type="checkbox" 
          defaultChecked={numberAllowed}
          onChange={ 
            ()=> setnumber((prev)=>!prev )
            }  />
            <label className='mx-1  text-white'> Number</label>
          </div>

          <div className='flex'>
          <input type="checkbox" 
          defaultChecked={character}
          onChange={ 
            ()=> setCharacter((prev)=>!prev )
            }  />
            <label className='mx-1  text-white' > character</label>
          </div>
         
        </div>
      </div>
    </>
  )
}

export default App
