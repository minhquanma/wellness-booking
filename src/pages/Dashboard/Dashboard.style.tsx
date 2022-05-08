import styled from 'styled-components'

export const WelcomeCard = styled.div`
  width: 100%;
  height: 200px;
  background-color: white;
  border-radius: 30px;
  display: flex;
  align-items: center;
  padding: 0 50px;
  position: relative;
`

export const WelcomeLogo = styled.img`
  position: absolute;
  right: 80px;
  top: -10px;
  width: 280px;
  opacity: 0.8;
`

export const WelcomeCardName = styled.span`
  color: #f1a01b;
`

export const Heading = styled.div`
  margin: 30px 0;
`

export const BookingGridContainer = styled.div`
  width: 100%;
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  justify-content:  space-around;
`
