import React from 'react'
import SideBar from './components/sidebar/SideBar'
import Main from './components/main/Main'
import Nav from './components/nav/Nav'
const App = () => {

  return (
    <>
      <Nav></Nav>
      <div className="full-container">
        <SideBar></SideBar>
        <Main></Main>
      </div>
      {/* <h1>{import.meta.env.VITE_API_KEY}</h1> */}
    </>
  )
}

export default App
