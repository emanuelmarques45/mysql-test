import styled from "styled-components"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 1rem;
  gap: 1rem;

  button {
    background-color: #ff1654;
    border: 0;
    padding: 1rem 2rem;
    color: #fff;
    border-radius: 0.5rem;
    font-weight: 600;
    font-size: 1rem;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: #cc0036;
      cursor: pointer;
    }
  }
`

export { Container }
