import styled from 'styled-components'

export const Card = styled.div`
  /* box-shadow: 1px 1px 12px rgba(0, 0, 0, 0.12);
  ; */
  background-color: white;
  border-radius: 24px;
  width: 320px;
  height: 420px;
`
export const Header = styled.div`
  height: 40%;
  background: rgb(109, 101, 169);
  background: linear-gradient(
    139deg,
    rgba(109, 101, 169, 0.8267682072829132) 0%,
    rgba(99, 128, 241, 1) 100%
  );
  border-radius: 24px 24px 0 0;
`

export const Body = styled.div`
  padding: 20px;
`
export const EventLocation = styled.div`
  margin: 15px 0;
  height: 70px;
`
export const EventTitle = styled.div`
  height: 50px;
  font-weight: bold;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

export const LocationLabel = styled.span`
  font-weight: bold;
`

export const EventLocationText = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`
export const CreationInfo = styled.div`
  border-top: 1px solid #f0f0f0;
  padding-top: 15px;
`
