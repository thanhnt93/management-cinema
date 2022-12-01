package projectbackend.dto.employee;

import projectbackend.model.decentralization.User;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

public class EmployeeDto {

    private Integer id;

    @NotBlank(message = "Vui lòng nhập tên!")
    private String name;

    private Integer gender;

    @NotBlank(message = "Vui lòng nhập email!")
    @Email(message = "Email phải đúng định dạng, có đuôi là @gmail.com")
    private String email;

    @NotBlank(message = "Vui lòng nhập địa chỉ!")
    private String address;

    @NotBlank(message = "Vui lòng nhập số điện thoại!")
    @Pattern(regexp = "^((0|[(]84[)][+])9[01]\\d{7})$", message = "Số điện thoại phải đúng định dạng là " +
            "090|091xxxxxxx hoặc (84)+ 090|091xxxxxxx !")
    private String phoneNumber;

    @NotBlank
    @Pattern(regexp = "^(\\d{9}|\\d{12})$", message = "CMND gồm 9 hoặc 12 số!")
    private String idCard;

    @NotBlank(message = "Chọn ngày sinh!")
    private String dayOfBirth;

    @NotBlank(message = "Chọn ảnh!")
    private String image;

    private boolean isDelete;

    private User user;


    public EmployeeDto() {
    }

    public EmployeeDto(Integer id, String name, Integer gender, String email, String address, String phoneNumber,
                       String idCard, String dayOfBirth, String image, boolean isDelete, User user) {
        this.id = id;
        this.name = name;
        this.gender = gender;
        this.email = email;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.idCard = idCard;
        this.dayOfBirth = dayOfBirth;
        this.image = image;
        this.isDelete = isDelete;
        this.user = user;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getGender() {
        return gender;
    }

    public void setGender(Integer gender) {
        this.gender = gender;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getIdCard() {
        return idCard;
    }

    public void setIdCard(String idCard) {
        this.idCard = idCard;
    }

    public String getDayOfBirth() {
        return dayOfBirth;
    }

    public void setDayOfBirth(String dayOfBirth) {
        this.dayOfBirth = dayOfBirth;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public boolean isDelete() {
        return isDelete;
    }

    public void setDelete(boolean delete) {
        isDelete = delete;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}