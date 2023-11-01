import React, { useEffect } from 'react';
import styled from 'styled-components';
import Parallax from 'parallax-js';
import { Link } from "react-router-dom";



const StyledNotFound = styled.div`


@import url("https://fonts.googleapis.com/css?family=Barlow+Condensed:300,400,500,600,700,800,900|Barlow:300,400,500,600,700,800,900&display=swap");

$font-01: "Barlow",
sans-serif;
$font-02: "Barlow Condensed",
sans-serif;

$m-01: #FB8A8A;
$m-02: #FFEDC0;

$bg-01: #695681;
$bg-02: #36184F;
$bg-03: #32243E;

$g-01: linear-gradient(90deg, #FFEDC0 0%, #FF9D87 100%);
$g-02: linear-gradient(90deg, #8077EA 13.7%, #EB73FF 94.65%);

$cubic: cubic-bezier(0.4, 0.35, 0, 1.53);
$cubic2: cubic-bezier(0.18, 0.89, 0.32, 1.15);

$circleShadow: inset 5px 20px 40px rgba($bg-02, 0.25),
inset 5px 0px 5px rgba($bg-03, 0.3),
inset 5px 5px 20px rgba($bg-03, 0.25),
2px 2px 5px rgba(white, 0.2);


@mixin sm {
    @media screen and (max-width: 799px) {
        @content;
    }
}

@mixin height {
    @media screen and (max-height:660px) {
        @content;
    }
}

h1,
h2,
h3,
h4,
h5,
h6,
p,
ul,
li,
button,
a,
i,
input,
body {
    margin: 0;
    padding: 0;
    list-style: none;
    border: 0;
    -webkit-tap-highlight-color: transparent;
    text-decoration: none;
    color: inherit;

    &:focus {
        outline: 0;
    }
}


body {
    margin: 0;
    padding: 0;
    height: auto;
    font-family: $font-01;
    background: $bg-01;

}




nav {
    .menu {
        width: 100%;
        height: 80px;
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: space-between;
        //background-color: red;
        padding: 0 5%;
        box-sizing: border-box;
        z-index: 3;

        .website_name {
            color: $bg-01;
            font-weight: 600;
            font-size: 20px;
            letter-spacing: 1px;
            background: white;
            padding: 4px 8px;
            border-radius: 2px;
            opacity: 0.5;
            transition: all 0.4s ease;
            cursor: pointer;

            &:hover {
                opacity: 1;
            }
        }

        .menu_links {
            transition: all 0.4s ease;
            opacity: 0.5;

            &:hover {
                opacity: 1;
            }

            @include sm {
                display: none;

            }

            .link {
                color: white;
                text-transform: uppercase;
                font-weight: 500;
                margin-right: 50px;
                letter-spacing: 2px;
                position: relative;
                transition: all 0.3s 0.2s ease;

                &:last-child {
                    margin-right: 0;
                }

                &:before {
                    content: '';
                    position: absolute;
                    width: 0px;
                    height: 4px;
                    background: $g-01;
                    bottom: -10px;
                    border-radius: 4px;
                    transition: all 0.4s cubic-bezier(0.82, 0.02, 0.13, 1.26);
                    left: 100%;
                }

                &:hover {
                    opacity: 1;
                    color: $m-01;

                    &:before {
                        width: 40px;
                        left: 0;


                    }
                }
            }
        }

        .menu_icon {
            width: 40px;
            height: 40px;
            position: relative;
            display: none;
            justify-content: center;
            align-items: center;
            cursor: pointer;


            @include sm {
                display: flex;
            }

            .icon {
                width: 24px;
                height: 2px;
                background: white;
                position: absolute;

                &:before,
                &:after {
                    content: '';
                    width: 100%;
                    height: 100%;
                    background: inherit;
                    position: absolute;
                    transition: all 0.3s cubic-bezier(0.49, 0.04, 0, 1.55);
                }

                &:before {
                    transform: translateY(-8px);
                }

                &:after {
                    transform: translateY(8px);
                }


            }

            &:hover {
                .icon {
                    background: $m-02;

                    &:before {
                        transform: translateY(-10px);
                    }

                    &:after {
                        transform: translateY(10px);
                    }
                }
            }
        }
    }
}

.wrapper {
    display: grid;
    grid-template-columns: 1fr;
    justify-content: center;
    align-items: center;
    height: 100vh;
    overflow-x: hidden;

    .container {
        margin: 0 auto;
        transition: all 0.4s ease;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;

        // Scene for the Parallax Effect
        .scene {
            position: absolute;
            width: 100vw;
            height: 100vh;
            vertical-align: middle;
        }

        // All elements' containers
        .one,
        .two,
        .three,
        .circle,
        .p404 {
            width: 60%;
            height: 60%;
            top: 20% !important;
            left: 20% !important;
            min-width: 400px;
            min-height: 400px;

            .content {
                width: 600px;
                height: 600px;
                display: flex;
                justify-content: center;
                align-items: center;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                animation: content 0.8s cubic-bezier(1, 0.06, 0.25, 1) backwards;

                @keyframes content {
                    0% {
                        width: 0;
                    }
                }

                // Pieces
                .piece {
                    width: 200px;
                    height: 80px;
                    display: flex;
                    position: absolute;
                    border-radius: 80px;
                    z-index: 1;

                    animation: pieceLeft 8s cubic-bezier(1, 0.06, 0.25, 1) infinite both;


                    @keyframes pieceLeft {
                        0% {}

                        50% {
                            left: 80%;
                            width: 10%;
                        }

                        100% {}

                    }

                    @keyframes pieceRight {
                        0% {}

                        50% {
                            right: 80%;
                            width: 10%;
                        }

                        100% {}

                    }

                }
            }

            @include sm {
                width: 90%;
                height: 90%;
                top: 5% !important;
                left: 5% !important;
                min-width: 280px;
                min-height: 280px;
            }

            @include height {
                min-width: 280px;
                min-height: 280px;
                width: 60%;
                height: 60%;
                top: 20% !important;
                left: 20% !important;
            }
        }

        // Text and Button container
        .text {
            width: 60%;
            height: 40%;
            min-width: 400px;
            min-height: 500px;
            position: absolute;
            margin: 40px 0;
            animation: text 0.6s 1.8s ease backwards;

            @keyframes text {
                0% {
                    opacity: 0;
                    transform: translateY(40px);
                }
            }

            @include sm {
                min-height: 400px;
                height: 80%;
            }

            article {
                width: 400px;
                position: absolute;
                bottom: 0;
                z-index: 4;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                text-align: center;
                bottom: 0;
                left: 50%;
                transform: translateX(-50%);


                @include sm {
                    width: 100%;
                }

                p {
                    color: white;
                    font-size: 18px;
                    letter-spacing: 0.6px;
                    margin-bottom: 40px;
                    text-shadow: 6px 6px 10px $bg-03;
                }

                button {
                    height: 40px;
                    padding: 0 30px;
                    border-radius: 50px;
                    cursor: pointer;
                    box-shadow: 0px 15px 20px rgba($bg-02, 0.5);
                    z-index: 3;
                   
                    background-color:'#65c3c8';
                    text-transform: uppercase;
                    font-weight: 600;
                    font-size: 12px;
                    transition: all 0.3s ease;


                    &:hover {
                        box-shadow: 0px 10px 10px -10px rgba($bg-02, 0.5);
                        transform: translateY(5px);
                        background: $m-01;
                        color: white;
                    }
                }
            }
        }

        // The 404 Number
        .p404 {
            font-size: 200px;
            font-weight: 700;
            letter-spacing: 4px;
            color: white;
            display: flex !important;
            justify-content: center;
            align-items: center;
            position: absolute;
            z-index: 2;
            animation: anime404 0.6s cubic-bezier(0.3, 0.8, 1, 1.05) both;
            animation-delay: 1.2s;

            @include sm {
                font-size: 100px;
            }

            @keyframes anime404 {
                0% {
                    opacity: 0;
                    transform: scale(10) skew(20deg, 20deg);
                }
            }

            &:nth-of-type(2) {
                color: $bg-02;
                z-index: 1;
                animation-delay: 1s;
                filter: blur(10px);
                opacity: 0.8;
            }


        }

        // Bigger Circle
        .circle {
            position: absolute;

            &:before {
                content: '';
                position: absolute;
                width: 800px;
                height: 800px;
                background-color: rgba($bg-02, 0.2);
                border-radius: 100%;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                box-shadow: $circleShadow;
                animation: circle 0.8s cubic-bezier(1, 0.06, 0.25, 1) backwards;


                @keyframes circle {
                    0% {
                        width: 0;
                        height: 0;
                    }
                }

                @include sm {
                    width: 400px;
                    height: 400px;
                }
            }
        }

        // Container 1
        .one {
            .content {

                // Smaller Circle
                &:before {
                    content: '';
                    position: absolute;
                    width: 600px;
                    height: 600px;
                    background-color: rgba($bg-02, 0.3);
                    border-radius: 100%;
                    box-shadow: $circleShadow;
                    animation: circle 0.8s 0.4s cubic-bezier(1, 0.06, 0.25, 1) backwards;

                    @include sm {
                        width: 300px;
                        height: 300px;
                    }
                }

                .piece {
                    background: $g-02;

                    &:nth-child(1) {
                        right: 15%;
                        top: 18%;
                        height: 30px;
                        width: 120px;
                        animation-delay: 0.5s;
                        animation-name: pieceRight;
                    }

                    &:nth-child(2) {
                        left: 15%;
                        top: 45%;
                        width: 150px;
                        height: 50px;
                        animation-delay: 1s;
                        animation-name: pieceLeft;
                    }

                    &:nth-child(3) {
                        left: 10%;
                        top: 75%;
                        height: 20px;
                        width: 70px;
                        animation-delay: 1.5s;
                        animation-name: pieceLeft;
                    }

                }


            }
        }

        // Container 2
        .two {
            .content {
                .piece {
                    background: $g-01;

                    &:nth-child(1) {
                        left: 0%;
                        top: 25%;
                        height: 40px;
                        width: 120px;
                        animation-delay: 2s;
                        animation-name: pieceLeft;
                    }

                    &:nth-child(2) {
                        right: 15%;
                        top: 35%;
                        width: 180px;
                        height: 50px;
                        animation-delay: 2.5s;
                        animation-name: pieceRight;
                    }

                    &:nth-child(3) {
                        right: 10%;
                        top: 80%;
                        height: 20px;
                        width: 160px;
                        animation-delay: 3s;
                        animation-name: pieceRight;
                    }

                }
            }
        }

        // Container 3
        .three {
            .content {
                .piece {
                    background: $m-01;

                    &:nth-child(1) {
                        left: 25%;
                        top: 35%;
                        height: 20px;
                        width: 80px;
                        animation-name: pieceLeft;
                        animation-delay: 3.5s;
                    }

                    &:nth-child(2) {
                        right: 10%;
                        top: 55%;
                        width: 140px;
                        height: 40px;
                        animation-name: pieceRight;
                        animation-delay: 4s;
                    }

                    &:nth-child(3) {
                        left: 40%;
                        top: 68%;
                        height: 20px;
                        width: 80px;
                        animation-name: pieceLeft;
                        animation-delay: 4.5s;
                    }

                }


            }
        }


    }
}
`; 



function NotFound({ className }) {
    useEffect(() => {
        var scene = document.getElementById('scene');
        var parallax = new Parallax(scene);
      return () => {
        parallax.destroy();
    };
}, []);
    return (
        <StyledNotFound className={className}>
    <section className="wrapper">
        <div className="container">

            <div id="scene" className="scene" data-hover-only="false">


                <div className="circle" data-depth="1.2">

                <div className="one" data-depth="0.9">
                    <div className="content">
                        <span className="piece"></span>
                        <span className="piece"></span>
                        <span className="piece"></span>
                    </div>
                </div>

                <div className="two" data-depth="0.60">
                    <div className="content">
                        <span className="piece"></span>
                        <span className="piece"></span>
                        <span className="piece"></span>
                    </div>
                </div>

                <div className="three" data-depth="0.40">
                    <div className="content">
                        <span className="piece"></span>
                        <span className="piece"></span>
                        <span className="piece"></span>
                    </div>
                </div>
                </div>

                <p className="p404 btn-secondary" data-depth="0.50">404</p>
                <p className="p404 btn-secondary" data-depth="0.10">404</p>

            </div>

            <div className="text">
                <article>
                <p>ขออภัย หน้าที่คุณค้นหาไม่มี <br />โปรดกลับ ไปที่หน้าเริ่มต้น</p>
                <Link to="/">
                <button className="btn btn-primary">Back to Home</button>
                </Link>
                </article>
            </div>

        </div>
    </section>
    
    </StyledNotFound>
  )
}

export default NotFound;