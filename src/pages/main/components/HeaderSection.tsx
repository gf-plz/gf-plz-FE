import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import type { GenderKey } from "../MainPage";
import type { ProfileContent } from "../MainPage";

export const HeaderSection = ({
  gender,
  setGender,
  profileContent,
}: {
  gender: GenderKey;
  setGender: (gender: GenderKey) => void;
  profileContent: ProfileContent;
}) => {
  const theme = useTheme();
  const accent = theme.colors.primary[gender];
  return (
    <Container>
      <Title>
        {gender === "male" ? "내 남친을 낳아도" : "내 여친을 낳아도"}
      </Title>
      <ToggleWrapper>
        <ToggleSwitch>
          <ToggleThumb $isMale={gender === "male"} $accent={accent} />
          {(Object.keys(profileContent) as GenderKey[]).map((key) => {
            const option = profileContent[key];
            const isActive = gender === key;

            return (
              <ToggleLabel
                key={key}
                type="button"
                onClick={() => setGender(key)}
                $isActive={isActive}
              >
                {option.label}
              </ToggleLabel>
            );
          })}
        </ToggleSwitch>
      </ToggleWrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing[4]};
`;

const Title = styled.h2`
  font-size: ${({ theme }) => theme.typography.heroTitle.fontSize};
  line-height: ${({ theme }) => theme.typography.heroTitle.lineHeight};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.default};
`;

const ToggleWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 96px;
`;

const ToggleSwitch = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  align-items: center;
  width: 100%;
  height: 42px;
  padding: 3px;
  border-radius: 9999px;
  background-color: ${({ theme }) => theme.colors.gray[20]};
`;

const ToggleThumb = styled.span<{ $isMale: boolean; $accent: string }>`
  position: absolute;
  top: 3px;
  left: 3px;
  width: 45px;
  height: calc(100% - 6px);
  border-radius: 9999px;
  background-color: ${({ $accent }) => $accent};
  transition: transform 0.25s ease;
  transform: ${({ $isMale }) =>
    $isMale ? "translateX(100%)" : "translateX(0)"};
`;

const ToggleLabel = styled.button<{ $isActive: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border: none;
  background: transparent;
  padding: ${({ theme }) => theme.spacing[2]} 0;
  font-size: ${({ theme }) => theme.typography.body2.fontSize};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.text.white : theme.colors.text.default};
  cursor: pointer;
`;
