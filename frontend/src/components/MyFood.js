import React from "react";
import styled from "styled-components";

const MyFood = ({ className }) => (
  <div className={className}>
    <div className="Myfood--box">
      <h1>
        <b>MyFood</b>
      </h1>
      <div className="Myfood--search">
        {/* 🔍 */}
        <Search placeholder="Search...." />
        {/* 📷 */}
      </div>
    </div>
    <div className="Myfood--list">
      <div
        tabIndex={0}
        className="collapse collapse-open border border-base-300 bg-base-200"
      >
        <div className="collapse-title text-xl font-medium">
         ข้าวสวยหอมมะลิตราอีซี่โก
        </div>
        <div className="collapse-content">
          <p> 1 ถ้อย - 300.0 Kcal</p>
        </div>
      </div>
      <div
        tabIndex={0}
        className="collapse collapse-open border border-base-300 bg-base-200"
      >
        <div className="collapse-title text-xl font-medium">
        ก๋วยเตี๋ยวเส้นเล็ก สด
        </div>
        <div className="collapse-content">
          <p> 100 ก. - 220.0 Kcal</p>
        </div>
        </div>
        <div
          tabIndex={0}
          className="collapse collapse-open border border-base-300 bg-base-200"
        >
          <div className="collapse-title text-xl font-medium">
          ก๋วยเตี๋ยวเส้นใหญ่ สด
          </div>
          <div className="collapse-content">
            <p> 100 ก. - 159.8 Kcal</p>
          </div>
        </div>
      
      <div
        tabIndex={0}
        className="collapse collapse-open border border-base-300 bg-base-200"
      >
        <div className="collapse-title text-xl font-medium">
        ขนมปังบิสกิต ธรรมดา
        </div>
        <div className="collapse-content">
          <p> 100 ก. - 212.2 Kcal</p>
        </div>
      </div>
      <div
        tabIndex={0}
        className="collapse collapse-open border border-base-300 bg-base-200"
      >
        <div className="collapse-title text-xl font-medium">
        ขนมปังกรอบ
        </div>
        <div className="collapse-content">
          <p> 100 ก. - 212.2 Kcal</p>
        </div>
      </div>
      <div
        tabIndex={0}
        className="collapse collapse-open border border-base-300 bg-base-200"
      >
        <div className="collapse-title text-xl font-medium">
        ขนมปังกรอบ
        </div>
        <div className="collapse-content">
          <p> 100 ก. - 212.2 Kcal</p>
        </div>
      </div> <div
        tabIndex={0}
        className="collapse collapse-open border border-base-300 bg-base-200"
      >
        <div className="collapse-title text-xl font-medium">
        ขนมปังกรอบ
        </div>
        <div className="collapse-content">
          <p> 100 ก. - 212.2 Kcal</p>
        </div>
      </div> <div
        tabIndex={0}
        className="collapse collapse-open border border-base-300 bg-base-200"
      >
        <div className="collapse-title text-xl font-medium">
        ขนมปังกรอบ
        </div>
        <div className="collapse-content">
          <p> 100 ก. - 212.2 Kcal</p>
        </div>
      </div>
      <br/>
      <div className="button">
        <div class="flex-grow"></div>
      <button  className="btn btn-success">➕ADD</button>
      </div>
    </div>
  </div>
);

export default styled(MyFood)`
  .Myfood--box {
    background-color: #65c3c8;
    width: 100%;
    height: 10rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .Myfood--box h1 {
    font-size: calc(60% + 2vmin);
    color: black;
    margin: auto;
  }
  .Myfood--search {
    width: 100%;
    max-width: 604px; /* ความกว้างของช่องค้นหาที่ไม่เปลี่ยนแปลง */
    margin: 1rem; /* ทำให้ช่องค้นหาอยู่กลางแนวแนวนอน */
  }
  .Myfood--list {
    margin: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
  }
  .collapse {
  border: 1px solid #EF9FBC;
  background-color: transparent;
}
.button{
    position: fixed;
    bottom: 20px;
}
`;
const Search = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;


