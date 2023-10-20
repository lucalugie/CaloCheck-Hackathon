import styled from "styled-components";
function Footer({ className }) {
  return (
    <div className={className}>
      <footer className="footer footer-center p-4 bg-base-300 text-base-content">
        <aside>
          <p>Copyright © 2023 - All right reserved by caloCheck</p>
        </aside>
      </footer>
    </div>
  );
}

export default styled(Footer)`
  footer {
    bottom: 0;
    left: 0;
    right: 0;
  }
`;
