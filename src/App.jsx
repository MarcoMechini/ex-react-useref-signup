import { useEffect, useRef, useState } from 'react'

function App() {
  const nomeCompleto = useRef('')
  const specializzazione = useRef('')
  const anniDiEsperienza = useRef(0);
  const [username, setUsername] = useState('') //
  const [password, setPassword] = useState('') //
  const [descrizione, setDescrizione] = useState('') //
  const [error, setError] = useState({}) //

  const letters = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = `!@#$%^&*()-_=+[]{}|;:'\\",.<>?/\`~`;

  function formReset() {
    nomeCompleto.current.value = '';
    specializzazione.current.value = '';
    anniDiEsperienza.current.value = 0;
    setUsername('')
    setPassword('')
    setDescrizione('')
    setError({})
  }

  const postSubmit = (e) => {
    e.preventDefault();

    const checkNomeCompleto = nomeCompleto.current?.value.trim() !== '';
    const checkUsername = username.trim() !== '';
    const checkPassword = password.trim() !== '';
    const checkSpecializzazione = specializzazione.current?.value !== '';
    const checkAnniDiEsperienza = anniDiEsperienza.current?.value !== '' && anniDiEsperienza.current?.value > 0;
    const checkDescrizione = descrizione.trim() !== '';

    if (checkNomeCompleto && checkUsername && checkPassword && checkSpecializzazione && checkAnniDiEsperienza && checkDescrizione) {
      console.log(`nome: ${nomeCompleto.current?.value}, username: ${username}, password: ${password}, 
        specialistica: ${specializzazione.current?.value}, anni di esperienza: ${anniDiEsperienza.current?.value}, 
        descrizione: ${descrizione}`);
    }

  }

  useEffect(() => {
    nomeCompleto.current.focus()
  }, [])

  useEffect(() => {

    if ([...username].some(char => symbols.includes(char))) {
      setError(e => ({ ...e, username: { status: 'red', message: 'username non deve includere simboli' } }))
    } else if (username.length < 5) {
      setError(e => ({ ...e, username: { status: 'red', message: 'username troppo breve' } }))
    } else {
      setError(e => ({ ...e, username: { status: 'green', message: '✓' } }))
    }

    console.log(error);

    const lettersInPassword = [...password].some(char => letters.includes(char))
    const numbersInPassword = [...password].some(char => numbers.includes(char))
    const symbolsInPassword = [...password].some(char => symbols.includes(char))

    if (password.length < 8) {
      setError(e => ({ ...e, password: { status: 'red', message: 'la password deve essere di almeno 8 caratteri' } }))
    } else if (!(lettersInPassword && numbersInPassword && symbolsInPassword)) {
      setError(e => ({ ...e, password: { status: 'red', message: 'la password deve contenere almeno una lettera un numero e un simbolo' } }))
    } else {
      setError(e => ({ ...e, password: { status: 'green', message: '✓' } }))
    }

    if (descrizione.trim().length < 10) {
      setError(e => ({ ...e, descrizione: { status: 'red', message: 'la descrizione deve essere di almeno 100 caratteri' } }))
    } else if (descrizione.trim().length > 1000) {
      setError(e => ({ ...e, descrizione: { status: 'red', message: 'la descrizione non deve essere più di 1000 caratteri' } }))
    } else {
      setError(e => ({ ...e, descrizione: { status: 'green', message: '✓' } }))
    }
  }, [username, password, descrizione])

  return (
    <>
      <form>
        <label htmlFor="nomeCompleto">Nome completo</label>
        <input type="text" id='nomeCompleto' name='nomeCompleto' ref={nomeCompleto} />
        {error.username && <p style={{ backgroundColor: error.username.status, minWidth: '10px', minHeight: '10px' }}>{error.username.message}</p>}
        <label htmlFor="username">Username</label>
        <input type="text" id='username' name='username'
          onChange={e => setUsername(e.target.value)}
          value={username} />
        {error.password && <p style={{ backgroundColor: error.password.status }}>{error.password.message}</p>}
        <label htmlFor="password">Password</label>
        <input type="password" id='password' name='password'
          onChange={e => setPassword(e.target.value)}
          value={password} />
        <label htmlFor="specializzazione">Specializzazione</label>
        <select ref={specializzazione}>
          {/* "Full Stack", "Frontend", "Backend" */}
          <option value="Full Stack">Full Stack</option>
          <option value="Frontend">Frontend</option>
          <option value="Backend">Backend</option>
        </select>
        <label htmlFor="anniDiEsperienza">Esperienza</label>
        <input type="number" id='anniDiEsperienza' name='anniDiEsperienza'
          ref={anniDiEsperienza} />
        {error.descrizione && <p style={{ backgroundColor: error.descrizione.status }}>{error.descrizione.message}</p>}
        <label htmlFor="descrizione">Descrizione</label>
        <textarea id='descrizione' name='descrizione'
          onChange={e => setDescrizione(e.target.value)}
          value={descrizione} />
        <button type='submit' onClick={postSubmit}>Submit</button>
        <button type='reset' onClick={formReset}>Reset</button>
      </form>
      <div style={{ height: '200vh', position: 'relative', backgroundColor: 'green' }}>
        <div className='arrow' onClick={() => { }}>↑</div>
      </div>
    </>
  )
}

export default App
