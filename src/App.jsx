import { useEffect, useMemo, useRef, useState } from 'react'

function App() {
  const nomeCompletoRef = useRef()
  const specializzazione = useRef()
  const anniDiEsperienza = useRef();
  const [username, setUsername] = useState('Marco00') //
  const [password, setPassword] = useState('?0sadfasdf') //
  const [descrizione, setDescrizione] = useState('porova desciriozne') //

  const letters = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = `!@#$%^&*()-_=+[]{}|;:'\\",.<>?/\`~`;


  const postSubmit = (e) => {
    e.preventDefault();

    const anniEsperienza = Number(anniDiEsperienza.current?.value || 0);

    if (
      !nomeCompletoRef.current?.value.trim() ||
      !username.trim() ||
      !password.trim() ||
      !specializzazione.current?.value.trim() ||
      anniEsperienza <= 0 ||
      descrizione.trim().length < 100 ||  // FIXATO IL CONTROLLO
      !isPasswordValid ||
      !isUsernameValid ||
      !idDescriptioValid
    ) {
      alert("Errore: compilare tutti i campi correttamente");
      return;
    }
    console.log(`
      nome: ${nomeCompletoRef.current?.value}, 
      username: ${username}, 
      password: ${password}, 
      specialistica: ${specializzazione.current?.value}, 
      anni di esperienza: ${anniDiEsperienza.current?.value}, 
      descrizione: ${descrizione}`);

  }

  useEffect(() => {
    nomeCompletoRef.current.focus()
  }, [])

  function formReset() {
    nomeCompletoRef.current.value = '';
    specializzazione.current.value = '';
    anniDiEsperienza.current.value = '';
    setUsername('')
    setPassword('')
    setDescrizione('')
    nomeCompletoRef.current.focus()
  }

  const isUsernameValid = useMemo(() => {
    const charsValid = [...username].every(char =>
      numbers.includes(char) || letters.includes(char.toLowerCase()));
    return charsValid && username.trim().length >= 6
  }, [username])

  const isPasswordValid = useMemo(() => {

    return (
      password.trim().length >= 8 &&
      [...password].some(char => letters.includes(char)) &&
      [...password].some(char => numbers.includes(char)) &&
      [...password].some(char => symbols.includes(char))
    )
  }, [password])

  const idDescriptioValid = useMemo(() => {
    return (
      descrizione.trim().length >= 100
      && descrizione.trim().length <= 1000
    )
  }, [descrizione])

  const formRef = useRef();

  return (
    <>
      <form ref={formRef}>
        <label htmlFor="nomeCompletoRef">Nome completo</label>
        <input type="text" id='nomeCompletoRef' name='nomeCompletoRef' ref={nomeCompletoRef} />
        <label htmlFor="username">Username</label>
        <input type="text" id='username' name='username'
          onChange={e => setUsername(e.target.value)}
          value={username} />
        {username.trim() && (
          <p style={{ color: isUsernameValid ? 'green' : 'red' }}>
            {isUsernameValid ? 'Username Valido' : 'Username di almeno 6 caratteri alfanumerici'}
          </p>)}
        <label htmlFor="password">Password</label>
        <input type="password" id='password' name='password'
          onChange={e => setPassword(e.target.value)}
          value={password} />
        {password.trim() && (
          <p style={{ color: isPasswordValid ? 'green' : 'red' }}>
            {isPasswordValid ? 'Password Valida' : 'Password di almeno 8 caratteri un numero e un simbolo'}
          </p>)}
        <label htmlFor="specializzazione">Specializzazione</label>
        <select ref={specializzazione}>
          <option value="">Seleziona</option>
          <option value="Full Stack">Full Stack</option>
          <option value="Frontend">Frontend</option>
          <option value="Backend">Backend</option>
        </select>
        <label htmlFor="anniDiEsperienza">Esperienza</label>
        <input type="number" id='anniDiEsperienza' name='anniDiEsperienza'
          ref={anniDiEsperienza} />
        <label htmlFor="descrizione">Descrizione</label>
        <textarea id='descrizione' name='descrizione'
          onChange={e => setDescrizione(e.target.value)}
          value={descrizione} />
        {descrizione.trim() && (
          <p style={{ color: idDescriptioValid ? 'green' : 'red' }}>
            {idDescriptioValid ? 'Descrizione valida' : `Descrizione compresa tra 100 e 1000 caratteri (${descrizione.length})`}
          </p>)}
        <button type='submit' onClick={postSubmit}>Submit</button>
        <button type='reset' onClick={formReset}>Reset</button>
      </form>
      <div style={{ height: '200vh', position: 'relative', backgroundColor: 'green' }}>
        <div className='arrow' onClick={() => { formRef.current.scrollIntoView({ behavior: 'smooth' }) }}>↑</div>
      </div>
    </>
  )
}

export default App
