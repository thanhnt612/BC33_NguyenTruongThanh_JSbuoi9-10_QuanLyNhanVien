//Kiem tra rong ================================================================//
function kiemTraRong(value, selectorError, name) {
  //output: true | false
  if (value === "") {
    document.querySelector(selectorError).innerHTML =
      name + " không được bỏ trống";
    return false;
  }
  document.querySelector(selectorError).innerHTML = "";
  return true;
}
//Kiem tra ky tu  ================================================================//
function kiemTraKyTu(value, selectorError, name) {
  var regex = /^[A-Z a-z]+$/;
  if (regex.test(value)) {
    document.querySelector(selectorError).innerHTML = "";
    return true;
  }
  document.querySelector(selectorError).innerHTML =
    name + " tất cả phải là ký tự";
  return false;
}
//Kiem tra email  ================================================================//
function kiemTraEmail(value, selectorError, name) {
  var regex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\ [[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (regex.test(value)) {
    document.querySelector(selectorError).innerHTML = "";
    return true;
  }
  document.querySelector(selectorError).innerHTML =
    name + " phải đúng định dạng ! Ví dụ: abc@gmail.com!";
  return false;
}
//Kiem tra tat ca la so
function kiemTraSo(value, selectorError, name) {
  var regex = /^[0-9]+$/;
  if (regex.test(value)) {
    document.querySelector(selectorError).innerHTML = "";
    return true;
  }
  document.querySelector(selectorError).innerHTML = name + " tất cả phải là số";
  return false;
}
//Kiem tra do dai
function kiemTraDoDai(value, selectorError, name, minLength, maxLength) {
  if (value.length > maxLength || value.length < minLength) {
    document.querySelector(selectorError).innerHTML =
      name + " từ " + minLength + " đến " + maxLength + " ký tự ! ";
    return false;
  }
  document.querySelector(selectorError).innerHTML = "";
  return true;
}
// Kiem tra mat khau
function kiemTraMatKhau(value, selectorError, name) {
  var regex =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,10}$/;
  if (regex.test(value)) {
    document.querySelector(selectorError).innerHTML = "";
    return true;
  }
  document.querySelector(selectorError).innerHTML =
    name +
    " chứa 6-10 ký tự, có ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt";
  return false;
}
//Kiem tra chon vi tri
function kiemTraViTri(value, selectorError, name) {
  var hiden = document.querySelector("#selectHiden").value;
  if (value == hiden) {
    document.querySelector(selectorError).innerHTML =
      name + " không được bỏ trống";
    return false;
  }
  document.querySelector(selectorError).innerHTML = "";
  return true;
}
//Kiem tra dung dinh dang mm/dd/yy
function kiemTraNgayThangNam(value, selectorError, name) {
  var regex = /^(0?[1-9]|1[0-2])[\/](0?[1-9]|[1-2][0-9]|3[01])[\/]\d{4}$/;
  if (regex.test(value)) {
    document.querySelector(selectorError).innerHTML = "";
    return true;
  }
  document.querySelector(selectorError).innerHTML =
    name + " phải đúng định dạng mm/dd/yyyy";
  return false;
}
//Kiem tra gia tri
function kiemTraGiaTri(value, selectorError, name, minValue, maxValue) {
  if (
    Number(value) < minValue ||
    Number(value) > maxValue ||
    Number(value) === ""
  ) {
    document.querySelector(selectorError).innerHTML =
      name + " từ " + minValue + " đến " + maxValue + " VNĐ ";
    return false;
  }
  document.querySelector(selectorError).innerHTML = "";
  return true;
}
