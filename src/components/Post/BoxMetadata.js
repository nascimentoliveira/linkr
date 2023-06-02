import styled from "styled-components";

export default function BoxMetadata({ title, description, url, urlImage }) {
  return (
    <Box onClick={() => window.open(url)}>
      <UrlInfos>
        <h3>{title}</h3>
        <p>{description}</p>
        <h4>{url}</h4>
      </UrlInfos>
      <img src={urlImage} alt="URL" />
    </Box>
  );
}

const Box = styled.button`
  height: 60%;
  border-radius: 11px;
  border: 1px solid #4d4d4d;
  background-color: #171717;
  display: flex;
  justify-content: space-between;
  padding: 0;
  cursor: pointer;
  img {
    height: 100%;
    width: 30%;
    margin: 0;
    border-radius: 0px 11px 11px 0px;
    object-fit: cover;
  }
`;

const UrlInfos = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  text-align: left;
  align-items: flex-start;
  justify-content: space-around;
  padding: 2%;
  position: relative;
  h3 {
    font-size: 16px;
    color: #cecece;
  }
  p {
    font-size: 11px;
    color: #9b9595;
    white-space: wrap;

    max-width: 100%;
    overflow: hidden;
  }
  > h4 {
    color: #cecece;
    font-size: 11px;
    line-height: 13.2px;
  }
`;
//
