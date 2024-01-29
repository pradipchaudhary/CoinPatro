import styled from "styled-components";

export const DashboardHead = styled.div`
    margin-bottom: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid ${(props) => props.theme.colors.dark_alpha_01};
`;

export const SectionTitle = styled.h1`
    font-size: 24px;
    font-weight: 700;
`;

export const FooterSection = styled.footer`
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid ${(props) => props.theme.colors.dark_alpha_01};
    display: flex;
    justify-content: space-between;
    align-items: center;

    & .copyright {
        font-weight: 400;
        & a {
            color: ${(props) => props.theme.colors.dark};
        }
    }

    & .social-links {
        & a {
            padding: 1.5px;
            color: ${(props) => props.theme.colors.dark};
        }
    }
`;

export const UpdatedStats = styled.div`
    margin-top: 9px;
    & span {
        font-size: 10px;
        font-weight: bold;
        background: #f3f3f3;
        padding: 0.1rem 0.2rem;
        border-radius: 3px;
    }
`;

export const DashboardContent = styled.div`
    padding: 10px;
`;
