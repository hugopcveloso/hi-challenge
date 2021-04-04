<template>
  <div class="table-container__header">
    <div class="filter__container">
      Company
      <div class="filter__element">
        <span> All </span>
        <svg
          width="7"
          height="3"
          viewBox="0 0 7 3"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.5 3L0.468911 -9.41288e-08L6.53109 4.35844e-07L3.5 3Z"
            fill="#AEAEAE"
          />
        </svg>
      </div>
    </div>
    <button class="add_contact">Add contact</button>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.table-container__header {
  margin-top: 36px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  align-items: center;
}
.filter__container {
  font-size: 12px;
  font-weight: 400px;
  color: #6a707e;
  display: flex;
  align-items: center;

  .filter__element {
    cursor: pointer;
    display: flex;
    align-items: center;
    color: $accentblue;
    span {
      margin-left: 5px;
      margin-right: 5px;
    }
  }
}
.add_contact {
  background-color: $accentblue;
  width: 160px;
  height: 42px;
  border: none;
  box-shadow: 0px 4px 10px rgba(16, 156, 241, 0.24);
  border-radius: 4px;
  font-family: "Poppins", sans-serif;
  color: white;
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 19px;
  text-align: center;
  letter-spacing: 0.01em;
  transition: all 0.1s ease-in-out;
  &:hover {
    cursor: pointer;
    transform: scale(1.03);
  }
}
</style>