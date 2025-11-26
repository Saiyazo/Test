import React from "react";
import { Navbar, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function AppNavbar() {
  const navigate = useNavigate();

  return (
    <Navbar
      bg="white"
      expand="lg"
      className="shadow-sm border-bottom"
      style={{
        height: "70px",
        paddingLeft: "40px",
        paddingRight: "40px",
      }}
    >
      <Container
        fluid
        className="d-flex justify-content-between align-items-center"
        style={{ padding: 0 }}
      >
        {/* LEFT SIDE — LOGO */}
        <div
          role="button"
          onClick={() => navigate("/seller/dashboard")}
          className="d-flex align-items-center"
          style={{ gap: "10px", cursor: "pointer" }}
        >
          <img
            src="https://media.discordapp.net/attachments/1259033829314920469/1442804479744413696/data_.png?ex=6926c3e1&is=69257261&hm=3dd3ecea0da2115c6243f164374054850f3192b23fa24938784b30adc00c0091&=&format=webp&quality=lossless&width=1423&height=800"
            alt="Logo"
            style={{
              height: "70px",     
              width: "auto",
              objectFit: "contain",
            }}
          />
        </div>

        {/* RIGHT SIDE — CHAT BUTTON */}
        <Button
          style={{
            backgroundColor: "#0056ff",
            borderRadius: "20px",
            padding: "6px 20px",
            fontWeight: "600",
            border: "none",
            fontSize: "14px",
          }}
        >
          แชต
        </Button>
      </Container>
    </Navbar>
  );
}
