var staffList = [];
//Tạo danh sách nhân viên
function createStaff() {
  var staffAccount = document.querySelector("#tknv").value;
  var staffName = document.querySelector("#name").value;
  var staffEmail = document.querySelector("#email").value;
  var staffPassword = document.querySelector("#password").value;
  var staffDay = document.querySelector("#datepicker").value;
  var staffPosition = document.querySelector("#chucvu").value;
  var staffSalary = document.querySelector("#luongCB").value;
  var staffHour = document.querySelector("#gioLam").value;

  var staff = new Staff(
    staffAccount,
    staffName,
    staffEmail,
    staffDay,
    staffPosition,
    staffSalary,
    staffHour,
    staffPassword
  );
  console.log(staff);
  var valid = true;
  valid &=
    kiemTraRong(staff.account, "#tbTKNV", "Tài khoản NV") &
    kiemTraRong(staff.name, "#tbTen", "Tên NV") &
    kiemTraRong(staff.email, "#tbEmail", "Email") &
    kiemTraRong(staff.password, "#tbMatKhau", "Mật khẩu") &
    kiemTraRong(staff.day, "#tbNgay", "Ngày làm việc") &
    kiemTraRong(staff.salary, "#tbLuongCB", "Lương cơ bản") &
    kiemTraRong(staff.position, "#tbChucVu", "Chức vụ") &
    kiemTraRong(staff.hour, "#tbGiolam", "Giờ làm");
  if (kiemTraRong(staff.account, "#tbTKNV", "Tài khoản NV")) {
    valid &= kiemTraSo(staff.account, "#tbTKNV", "Tài khoản NV");
  }
  if (kiemTraRong(staff.name, "#tbTen", "Tên NV")) {
    valid &= kiemTraKyTu(staff.name, "#tbTen", "Tên NV");
  }
  if (kiemTraSo(staff.account, "#tbTKNV", "Tài khoản NV")) {
    valid &= kiemTraDoDai(staff.account, "#tbTKNV", "Tài khoản NV", 4, 6);
  }
  valid &= kiemTraEmail(staff.email, "#tbEmail", "Email");
  if (kiemTraRong(staff.password, "#tbMatKhau", "Mật khẩu")) {
    valid &= kiemTraMatKhau(staff.password, "#tbMatKhau", "Mật khẩu");
  }
  valid &= kiemTraViTri(staff.position, "#tbChucVu", "Chức vụ");
  if (kiemTraRong(staff.day, "#tbNgay", "Ngày làm việc")) {
    valid &= kiemTraNgayThangNam(staff.day, "#tbNgay", "Ngày làm việc");
  }
  if (kiemTraRong(staff.salary, "#tbLuongCB", "Lương cơ bản")) {
    valid &= kiemTraGiaTri(
      staff.salary,
      "#tbLuongCB",
      "Lương cơ bản",
      1000000,
      20000000
    );
  }
  if (kiemTraRong(staff.hour, "#tbGiolam", "Giờ làm")) {
    valid &= kiemTraGiaTri(staff.hour, "#tbGiolam", "Giờ làm", 80, 200);
  }
  if (!valid) {
    return;
  }
  staffList.push(staff);
  renderStaffList(staffList);
  saveLocalStorage(staffList, "arrNV");
}
// function calcSalary() {
//   var boss = document.querySelector("#boss").value;
//   var manager = document.querySelector("#manager").value;
//   var member = document.querySelector("#member").value;
//   if(boss){
//     salary
//   }
// }
//Hiện danh sách lên
function renderStaffList(arrNV) {
  var output = "";
  for (var index = 0; index < arrNV.length; index++) {
    var obNhanVien = arrNV[index];
    obNhanVien.salaryTotal = function () {
      var boss = document.querySelector("#boss").value;
      var manager = document.querySelector("#manager").value;
      if (obNhanVien.position == boss) {
        return Number(this.salary) * 3;
      } else if (obNhanVien.position == manager) {
        return Number(this.salary) * 2;
      } else {
        return Number(this.salary) * 1;
      }
    };
    obNhanVien.rank = function () {
      var excellent = "NV xuất sắc";
      var veryGood = "NV giỏi";
      var good = "NV khá";
      var average = "NV trung bình";
      if (obNhanVien.hour >= 192) {
        return excellent;
      } else if (obNhanVien.hour >= 176) {
        return veryGood;
      } else if (obNhanVien.hour >= 160) {
        return good;
      } else {
        return average;
      }
    };
    var trNv = `
         <tr>
            <td>${obNhanVien.account}</td>
            <td>${obNhanVien.name}</td>
            <td>${obNhanVien.email}</td>
            <td>${obNhanVien.day}</td>
            <td>${obNhanVien.position}</td>
            <td>${obNhanVien.salaryTotal()}</td>
            <td>${obNhanVien.rank()}</td>
            <td>
               <button class="btn btn-danger" onclick="delStaff('${
                 obNhanVien.account
               }')">Del</button>
               <button class="btn btn-primary" data-toggle="modal"
               data-target="#myModal" onclick="editStaff('${
                 obNhanVien.account
               }')">Edit</button>
            </td>
         </tr>
    `;
    output += trNv;
  }
  document.querySelector("tbody").innerHTML = output;
  return output;
}
//Chỉnh sữa nhân viên
function editStaff(idClick) {
  var nvEdit = null;
  for (var index = 0; index < staffList.length; index++) {
    if (staffList[index].account == idClick) {
      nvEdit = staffList[index];
      break;
    }
  }
  if (nvEdit !== null) {
    document.querySelector("#tknv").value = nvEdit.account;
    document.querySelector("#name").value = nvEdit.name;
    document.querySelector("#email").value = nvEdit.email;
    document.querySelector("#password").value = nvEdit.password;
    document.querySelector("#datepicker").value = nvEdit.day;
    document.querySelector("#luongCB").value = nvEdit.salary;
    document.querySelector("#chucvu").value = nvEdit.position;
    document.querySelector("#gioLam").value = nvEdit.hour;
  }
}
//Cap Nhat nhan vien
function updateStaff() {
  var nvUpdate = new Staff();
  nvUpdate.account = document.querySelector("#tknv").value;
  nvUpdate.name = document.querySelector("#name").value;
  nvUpdate.email = document.querySelector("#email").value;
  nvUpdate.password = document.querySelector("#password").value;
  nvUpdate.day = document.querySelector("#datepicker").value;
  nvUpdate.salary = document.querySelector("#luongCB").value;
  nvUpdate.position = document.querySelector("#chucvu").value;
  nvUpdate.hour = document.querySelector("#gioLam").value;
  console.log(nvUpdate);
  let indexEdit = -1;
  for (var index = 0; index < staffList.length; index++) {
    if (staffList[index].account == nvUpdate.account) {
      indexEdit = index;
      break;
    }
  }
  if (indexEdit !== -1) {
    staffList[indexEdit].name = nvUpdate.name;
    staffList[indexEdit].email = nvUpdate.email;
    staffList[indexEdit].password = nvUpdate.password;
    staffList[indexEdit].day = nvUpdate.day;
    staffList[indexEdit].salary = nvUpdate.salary;
    staffList[indexEdit].position = nvUpdate.position;
    staffList[indexEdit].hour = nvUpdate.hour;
  }
  console.log(staffList[indexEdit]);
  var valid = true;
  valid &=
    kiemTraRong(staffList[indexEdit].name, "#tbTen", "Tên NV") &
    kiemTraRong(staffList[indexEdit].email, "#tbEmail", "Email") &
    kiemTraRong(staffList[indexEdit].password, "#tbMatKhau", "Mật khẩu") &
    kiemTraRong(staffList[indexEdit].day, "#tbNgay", "Ngày làm việc") &
    kiemTraRong(staffList[indexEdit].salary, "#tbLuongCB", "Lương cơ bản") &
    kiemTraRong(staffList[indexEdit].position, "#tbChucVu", "Chức vụ") &
    kiemTraRong(staffList[indexEdit].hour, "#tbGiolam", "Giờ làm");
  if (kiemTraRong(staffList[indexEdit].account, "#tbTKNV", "Tài khoản NV")) {
    valid &= kiemTraSo(staffList[indexEdit].account, "#tbTKNV", "Tài khoản NV");
  }
  if (kiemTraRong(staffList[indexEdit].name, "#tbTen", "Tên NV")) {
    valid &= kiemTraKyTu(staffList[indexEdit].name, "#tbTen", "Tên NV");
  }
  if (kiemTraSo(staffList[indexEdit].account, "#tbTKNV", "Tài khoản NV")) {
    valid &= kiemTraDoDai(staffList[indexEdit].account, "#tbTKNV", "Tài khoản NV", 4, 6);
  }
  valid &= kiemTraEmail(staffList[indexEdit].email, "#tbEmail", "Email");
  if (kiemTraRong(staffList[indexEdit].password, "#tbMatKhau", "Mật khẩu")) {
    valid &= kiemTraMatKhau(staffList[indexEdit].password, "#tbMatKhau", "Mật khẩu");
  }
  valid &= kiemTraViTri(staffList[indexEdit].position, "#tbChucVu", "Chức vụ");
  if (kiemTraRong(staffList[indexEdit].day, "#tbNgay", "Ngày làm việc")) {
    valid &= kiemTraNgayThangNam(staffList[indexEdit].day, "#tbNgay", "Ngày làm việc");
  }
  if (kiemTraRong(staffList[indexEdit].salary, "#tbLuongCB", "Lương cơ bản")) {
    valid &= kiemTraGiaTri(
      staffList[indexEdit].salary,
      "#tbLuongCB",
      "Lương cơ bản",
      1000000,
      20000000
    );
  }
  if (kiemTraRong(staffList[indexEdit].hour, "#tbGiolam", "Giờ làm")) {
    valid &= kiemTraGiaTri(staffList[indexEdit].hour, "#tbGiolam", "Giờ làm", 80, 200);
  }
  if (!valid) {
    return;
  }
  renderStaffList(staffList);
  saveLocalStorage(staffList, "arrNV");
}
//Xóa nhân viên
function delStaff(idClick) {
  for (var index = staffList.length - 1; index >= 0; index--) {
    if (staffList[index].account == idClick) {
      staffList.splice(index, 1);
    }
  }
  renderStaffList(staffList);
  saveLocalStorage(staffList, "arrNV");
}
//Tim kiem nhan vien
var searchStaff = function () {
  var tuKhoa = document.querySelector("#searchName").value;
  tuKhoa = removeVietnameseTones(tuKhoa);

  var output = [];
  for (var index = 0; index < staffList.length; index++) {
    var obStaff = staffList[index];
    obStaff.rank = function () {
      var excellent = "NV xuất sắc";
      var veryGood = "NV giỏi";
      var good = "NV khá";
      var average = "NV trung bình";
      if (obStaff.hour >= 192) {
        return excellent;
      } else if (obStaff.hour >= 176) {
        return veryGood;
      } else if (obStaff.hour >= 160) {
        return good;
      } else {
        return average;
      }
    };
    var tenNhanVien = removeVietnameseTones(obStaff.rank());
    if (tenNhanVien.search(tuKhoa) != -1) {
      output.push(staffList[index]);
    }
  }
  renderStaffList(output);
};
document.querySelector("#btnTimNV").onclick = searchStaff;

//Luu vao storage
function saveLocalStorage(ob, key) {
  var str = JSON.stringify(ob);
  localStorage.setItem(key, str);
}
//Lay du lieu trong storage
function getLocalStorage(key) {
  if (localStorage.getItem(key)) {
    var str = localStorage.getItem(key);
    var ob = JSON.parse(str);
    return ob;
  }
  return undefined;
}
//Chay sau khi thuc thi xong js
window.onload = function () {
  staffList = getLocalStorage("arrNV");
  console.log("staffList", staffList);
  if (staffList == undefined) {
    staffList = [];
  }
  renderStaffList(staffList);
};

function removeVietnameseTones(str) {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
  str = str.replace(/Đ/g, "D");
  // Some system encode vietnamese combining accent as individual utf-8 characters
  // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
  // Remove extra spaces
  // Bỏ các khoảng trắng liền nhau
  str = str.replace(/ + /g, " ");
  str = str.trim();
  // Remove punctuations
  // Bỏ dấu câu, kí tự đặc biệt
  str = str.replace(
    /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
    " "
  );
  return str;
}
