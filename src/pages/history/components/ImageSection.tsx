import styled from "@emotion/styled";

type ImageSectionProps = {
  imageUrl: string;
  name: string;
};

export const ImageSection = ({ imageUrl, name }: ImageSectionProps) => {
  return (
    <Container>
      <CardImage src={imageUrl} alt={name} />
      <NameOverlay>{name}</NameOverlay>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  border-radius: 16px;
  overflow: hidden;
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const NameOverlay = styled.span`
  position: absolute;
  bottom: 16px;
  left: 16px;
  font-size: 1.5rem;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.white};
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;
