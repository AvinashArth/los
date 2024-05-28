import React, { useState, useEffect } from 'react';
import './userDetails.css'; // Import CSS file
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  CardFooter,
  Label,
  Form,
  FormGroup,
  Input,
  Col,
  Alert
} from "reactstrap";
import { Task } from "../../backend-sdk/task.sdk";

//createOnboard
const CustomerDetailsForm = () => {
  // State for location
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [accuracy, setAccuracy] = useState('');
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState("")

  // State for captured images
  const [selfieCaptured, setSelfieCaptured] = useState(false);
  const [shopPhotoCaptured, setShopPhotoCaptured] = useState(false);

  // State for form fields
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    guardian_name: '',
    relation_with_guardian: '',
    guardian_occupation: '',
    dob: '',
    pan_number: '',
    mobile: '',
    email: '',
    gender: '',
    occupation_category: '',
    other_occupation: '',
    business_type: '',
    monthly_income: '',
    loan_amount: '',
    loan_category: '',
    employment_type: '',
    salary_received_type: '',
    company_name: '',
    type_of_loan: '',
    shop_type: '',
    education_level: '',
    insurance: '',
    shop_road_type: '',
    home_address: '',
    home_city: '',
    home_state: '',
    home_pincode: '',
    business_address: '',
    business_city: '',
    business_state: '',
    business_pincode: ''
   
  });

  useEffect(() => {
    // Fetch user's geolocation
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        setAccuracy(position.coords.accuracy);
      },
      (error) => {
        console.error('Error getting user location:', error);
      }
    );
  }, []); // Empty dependency array ensures effect runs only once

  const ArrayState =  [
    "andhrapradesh", "arunachalpradesh", "assam", "bihar", "chattisgarh", "delhi", "goa", "gujarat", "haryana", "himachalpradesh", "jammuandkashmir",
    "jammu&kashmir", "jharkhand", "karnataka", "kerala", "lakshadweepislands", "lakshadweep", "madhyapradesh", "maharashtra", "manipur", "meghalaya",
    "mizoram", "nagaland", "odisha", "orissa", "pondicherry", "punjab", "rajasthan", "sikkim", "tamilnadu", "telangana", "tripura", "uttarpradesh",
    "uttarakhand", "westbengal", "andamanandnicobarislands", "andaman&nicobar", "chandigarh", "dadraandnagarhaveli", "damananddiu", "daman&diu",
    "otherterritory", "Uttaranchal"
  ]

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const isVerification = () => {
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
    const mobileRegex = /^[0-9]{10}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (!panRegex.test(formData.pan_number)) {
      setVisible(true);
      setError("Please enter the correct PAN number");
      setTimeout(() => {
        setVisible(false);
      }, 1000);
      return false;
    } else if (!mobileRegex.test(formData.mobile)) {
      setVisible(true);
      setError("Please enter the correct mobile number");
      setTimeout(() => {
        setVisible(false);
      }, 1000);
      return false;
    } else if (!emailRegex.test(formData.email)) {
      setVisible(true);
      setError("Please enter the correct email");
      setTimeout(() => {
        setVisible(false);
      }, 1000);
      return false;
    }
    
    return true;
  }
  
  const onDismiss = () => {
    setVisible(false);
  }
  // Handle form submission
  const handleSubmit = (e) => {
      e.preventDefault();
      if (!isVerification()) {
        return; // Exit function if validation fails
      }
    const data ={
      first_name: formData.first_name, 
      last_name: formData.last_name, 
      guardian_name: formData.guardian_name,
      relation_with_guardian:formData.relation_with_guardian, 
      guardian_occupation: formData.guardian_occupation, 
      dob: formData.dob, 
      pan_number: formData.pan_number, 
      partner_code: "TIDE",
      mobile:formData.mobile, 
      email: formData.email, 
      gender: formData.gender, 
      occupation_category: formData.occupation_category, 
      other_occupation: formData.other_occupation, 
      business_type: formData.business_type, 
      monthly_income: formData.monthly_income, 
      loan_amount: formData.loan_amount, 
      loan_category: formData.loan_category,
      employment_type: formData.employment_type, 
      salary_received_type: formData.salary_received_type, 
      company_name: formData.company_name, 
      type_of_loan: formData.type_of_loan, 
      shop_type: formData.shop_type, 
      education_level: formData.education_level, 
      insurance: formData.insurance, 
      shop_road_type: formData.shop_road_type,
      home_address: formData.home_address, 
      home_city: formData.home_city, 
      home_state: formData.home_state, 
      home_pincode: formData.home_pincode, 
      business_address: formData.business_address, 
      business_city: formData.business_city, 
      business_state: formData.business_state, 
      business_pincode: formData.business_pincode,
      latitude: latitude, 
      longitude: longitude, 
      accuracy: accuracy
    }
    // console.log("error", data)
    Task.createOnboard(data)
      .then((res) => {
        setVisible(true);
        setError(res.message);
        setTimeout(() => {
          setVisible(false); // Set visibility to false after 1 second
        }, 2000);
        // console.log("jjdj", res);
      })
      .catch((err) => {
        setVisible(true);
        setError(err.message);
        setTimeout(() => {
          setVisible(false); // Set visibility to false after 1 second
        }, 2000);
        console.log(err.error);
      });
    
    // Implement form submission logic
     console.log('Form submitted with data:', formData);
  };

  return (
    <div className="">
      <Row>
        <Col className="ml-auto mr-auto col-md-8 col-lg-8">
        <Card>
          <Form onSubmit={handleSubmit}>
          <CardHeader>
              <CardTitle tag="h3">Loan Application Request Form</CardTitle>
            </CardHeader>
            <CardBody>
            {/* <form onSubmit={handleSubmit}> */}
        {/* Add form fields */}
        <FormGroup>
        <Label htmlFor="first_name">First Name</Label>
        <Input
          type="text"
          id="first_name"
          name="first_name"
          value={formData.first_name}
          onChange={handleInputChange}
          required
        />
        </FormGroup>
        
         <FormGroup>
         <Label> Last Name</Label>
          <Input
          type="text"
  id="last_name"
  name="last_name"
  value={formData.last_name}
  onChange={handleInputChange}
  required
      />

         </FormGroup>
        <FormGroup>
          <Label> Guardian Name </Label>
          <Input
  type="text"
  id="guardian_name"
  name="guardian_name"
  value={formData.guardian_name}
  onChange={handleInputChange}
  required
/>
        </FormGroup>
<FormGroup>
  <Label>
  Relation With Guardian
  </Label>
  <Input
  id="relation_with_guardian"
  className='form-control'
  type="select"
  name="relation_with_guardian"
  value={formData.relation_with_guardian}
  onChange={handleInputChange}
  required
>
  <option value="">Select</option>
  <option value="father">Father</option>
  <option value="mother">Mother</option>
  <option value="wife">Wife</option>
  <option value="husband">Husband</option>
  <option value="brother">Brother</option>
  <option value="sister">Sister</option>
</Input>
</FormGroup>
 <FormGroup>
  <Label>Guardian Occupation</Label>
  <Input
  id="guardian_occupation"
  className='form-control'
  type="select"
  name="guardian_occupation"
  value={formData.guardian_occupation}
  onChange={handleInputChange}
  required
>
  <option value="">Select</option>
  <option value="Self Employed/Business">Self Employed/Business</option>
  <option value="Private Sector Job">Private Sector Job</option>
  <option value="Public Sector Job">Public Sector Job</option>
  <option value="Retired">Retired</option>
  <option value="Home Maker">Home Maker</option>
  <option value="Factory Worker">Factory Worker</option>
  <option value="Academic">Academic</option>
  <option value="Unemployed">Unemployed</option>
  <option value="Other">Other</option>
</Input>

 </FormGroup>
 
 <FormGroup>
  <Label> Date of Birth (YYYY-MM-DD)</Label>
  <Input
  type="text"
  id="dob"
  name="dob"
  value={formData.dob}
  onChange={handleInputChange}
  required
/>
 </FormGroup>
 <FormGroup>
  <Label>PAN Number (A-Z0-9)</Label>
  <Input
  type="text"
  id="pan_number"
  name="pan_number"
  value={formData.pan_number}
  onChange={handleInputChange}
  required
/>
 </FormGroup>

<FormGroup>
  <Label>
  Mobile (10 digits)
  </Label>
  <Input
  type="number"
  id="mobile"
  name="mobile"
  className='form-control'
  value={formData.mobile}
  onChange={handleInputChange}
  required
/>
</FormGroup>
<FormGroup>
  <Label>Email</Label>
  <Input
  type="email"
  id="email"
  className='form-control'
  name="email"
  value={formData.email}
  onChange={handleInputChange}
  required
/>
</FormGroup>

<FormGroup>
  <Label>Gender</Label>
  <div className='radio-button'>
  <Label>
    <Input
      type="radio"
      name="gender"
      value="Male"
      checked={formData.gender === 'Male'}
      onChange={handleInputChange}
      required
    />
    Male
  </Label>
  <Label>
    <Input
      type="radio"
      name="gender"
      value="Female"
      checked={formData.gender === 'Female'}
      onChange={handleInputChange}
    />
    Female
  </Label>
  <Label>
    <Input
      type="radio"
      name="gender"
      value="Other"
      checked={formData.gender === 'Other'}
      onChange={handleInputChange}
    />
    Other
  </Label>
  </div>
</FormGroup>
<formData>
  <Label>Occupation Category</Label>
  <Input
  id="occupation_category"
  name="occupation_category"
  type="select"
  className='form-control'
  value={formData.occupation_category}
  onChange={handleInputChange}
  required
>
  <option value="">Select</option>
  <option value="kirana">Kirana/Groceries/General Store</option>
  <option value="electronics">Electronics/E-commerce/Mobile Accessories/Telecom</option>
  <option value="pharmacy">Pharmacy/Medical</option>
  <option value="salon">Salon/Cosmetics/Beauty Parlor/Fitness</option>
  <option value="apparels">Apparels/Clothing/Boutique/Garments/Tailoring/Footwear</option>
  <option value="restaurant">Restaurant/Food</option>
  <option value="others">Others</option>
</Input>
</formData>
{formData.occupation_category && formData.occupation_category === "others" && (<>
  <FormGroup>
  <Label> Other</Label>
  <Input
  type="text"
  id="Other"
  name="Other"
  value={formData.other_occupation}
  onChange={handleInputChange}
  required
/>
</FormGroup>
 </>)}
 <FormGroup>
  <Label>Business Type</Label>
  <Input
  id="business_type"
  name="business_type"
  type="select"
  className='form-control'
  value={formData.business_type}
  onChange={handleInputChange}
  required
>
  <option value="">Select</option>
  <option value="Seller-Retailer">Seller-Retailer</option>
  <option value="Seller-Wholesale">Seller-Wholesale</option>
  <option value="agri-dairy value chain">Agri-Dairy Value Chain</option>
</Input>
 </FormGroup>
<FormGroup>
  <Label>Monthly Income (Numeric)</Label>
  <Input
  type="number"
  id="monthly_income"
  className='form-control'
  name="monthly_income"
  value={formData.monthly_income}
  onChange={handleInputChange}
  required
/>

</FormGroup>
<FormGroup>
  <Label> Loan Amount (Numeric) </Label>
  <Input
  type="number"
  id="loan_amount"
  className='form-control'
  name="loan_amount"
  value={formData.loan_amount}
  onChange={handleInputChange}
  required
/>
</FormGroup>

<FormGroup>
  <Label>
  Loan Category
  </Label>
  <Input
  id="loan_category"
  name="loan_category"
  type="select"
  className='form-control'
  value={formData.loan_category}
  onChange={handleInputChange}
  required
>
  <option value="">Select</option>
  <option value="business_loan">Business Loan</option>
  <option value="personal_loan">Personal Loan</option>
</Input>
</FormGroup>
{formData.loan_category && formData.loan_category === "personal_loan" && (<>
  <FormGroup>
  <Label>Employment Type</Label>
  <Input
  id="employment_type"
  name="employment_type"
  type="select"
  className='form-control'
  value={formData.employment_type}
  onChange={handleInputChange}
  required
>
  <option value="">Select</option>
  <option value="Salaried full-time">Salaried full-time</option>
  <option value="Unemployed">Unemployed</option>
  <option value="Self-Employed">Self-Employed</option>
</Input>
</FormGroup>
<FormGroup>
  <Label>Salary Received Type</Label>
  <Input
  id="salary_received_type"
  name="salary_received_type"
  type="select"
  className='form-control'
  value={formData.salary_received_type}
  onChange={handleInputChange}
  required
>
  <option value="">Select</option>
  <option value="Cash">Cash</option>
  <option value="Cheque">Cheque</option>
  <option value="Direct Account Transfer">Direct Account Transfer</option>
</Input>
</FormGroup>
<FormGroup>
  <Label>Company Name</Label>
  <Input
  type="text"
  id="company_name"
  name="company_name"
  value={formData.company_name}
  onChange={handleInputChange}
/>
</FormGroup>
</>)}

<FormGroup>
  <Label>Type of Business Loan</Label>
  <Input
  id="type_of_loan"
  name="type_of_loan"
  type="select"
  className='form-control'
  value={formData.loan_type}
  onChange={handleInputChange}
  required
>
  <option value="">Select</option>
  <option value="Small Value Business Loan (50k - 2L)">Small Value Business Loan (50k - 2L)</option>
  <option value="High Value Business loan (2L - 7L)">High Value Business loan (2L - 7L)</option>
</Input>
</FormGroup>
<FormGroup>
  <Label>
  Shop Type
  </Label>
  <Input
  id="shop_type"
  name="shop_type"
  type="select"
  className='form-control'
  value={formData.shop_type}
  onChange={handleInputChange}
>
  <option value="">Select</option>
  <option value="Rented">Rented</option>
  <option value="Owned">Owned</option>
</Input>
</FormGroup>
<FormGroup>
  <Label>Education Level</Label>
  <Input
  id="education_level"
  name="education_level"
  type="select"
  className='form-control'
  value={formData.education_level}
  onChange={handleInputChange}
  required
>
  <option value="">Select</option>
  <option value="None">None</option>
  <option value="Primary">Primary</option>
  <option value="Upto 9th">Upto 9th</option>
  <option value="High School">High School</option>
  <option value="Intermediate">Intermediate</option>
  <option value="Graduate">Graduate</option>
  <option value="Post Graduate">Post Graduate</option>
</Input>

</FormGroup>
<FormGroup>
  <Label>Insurance</Label>
  <Input
  id="insurance"
  name="insurance"
  type="select"
  className='form-control'
  value={formData.insurance}
  onChange={handleInputChange}
  required
>
  <option value="">Select</option>
  <option value="Health">Health</option>
  <option value="Life">Life</option>
  <option value="Accidental">Accidental</option>
  <option value="Govt">Govt</option>
  <option value="None">None</option>
</Input>
</FormGroup>
<FormGroup>
  <Label>Shop Road Type</Label>
  <Input
  id="shop_road_type"
  name="shop_road_type"
  type="select"
  className='form-control'
  value={formData.shop_road_type}
  onChange={handleInputChange}
  required
>
  <option value="">Select</option>
  <option value="Highway">Highway</option>
  <option value="Street">Street</option>
  <option value="Market">Market</option>
  <option value="Village">Village</option>
</Input>
</FormGroup>

<FormGroup>
  <Label>Home Address (House No, Street as per Aadhaar)</Label>
  <Input
  type="text"
  id="home_address"
  name="home_address"
  value={formData.home_address}
  onChange={handleInputChange}
  required
/>
</FormGroup>
<FormGroup>
  <Label>Home City</Label>
  <Input
  type="text"
  id="home_city"
  name="home_city"
  value={formData.home_city}
  onChange={handleInputChange}
  required
/>

</FormGroup>
<FormGroup>
  <Label>Home State</Label>
  <Input
  id="home_state"
  name="home_state"
  type="select"
  className='form-control'
  value={formData.home_state}
  onChange={handleInputChange}
  required
>
<       option value="">Select</option>
        {ArrayState.map((state, index) => (
          <option key={index} value={state}>{state}</option>
        ))}
  {/* Include options for home states */}
</Input>
</FormGroup>
<FormGroup>
  <Label>Home Pincode (6 digits)</Label>
  <Input
  type="text"
  id="home_pincode"
  name="home_pincode"
  value={formData.home_pincode}
  onChange={handleInputChange}
  required
pattern="\d{6}"
/>
</FormGroup>
<FormGroup>
  <Label>Business Address (Shop No, Street)</Label>
  <Input
  type="text"
  id="business_address"
  name="business_address"
  value={formData.business_address}
  onChange={handleInputChange}
/>
</FormGroup>
{/* <label htmlFor="business_address">Business Address (Shop No, Street)</label>
<input
  type="text"
  id="business_address"
  name="business_address"
  value={formData.business_address}
  onChange={handleInputChange}
/> */}
<FormGroup>
  <Label>
  Business City
  </Label>
  <Input
  type="text"
  id="business_city"
  name="business_city"
  value={formData.business_city}
  onChange={handleInputChange}
  required
/>
</FormGroup>
{/* <label htmlFor="business_city">Business City</label>
<input
  type="text"
  id="business_city"
  name="business_city"
  value={formData.business_city}
  onChange={handleInputChange}
  required
/> */}
<FormGroup>
  <Label>Business State</Label>
  <Input
  id="business_state"
  name="business_state"
  type="select"
  className='form-control'
  value={formData.business_state}
  onChange={handleInputChange}
  required
>
        <option value="">Select</option>
        {ArrayState.map((state, index) => (
          <option key={index} value={state}>{state}</option>
        ))}
  
  {/* Include options for business states */}
</Input>
</FormGroup>
<FormGroup>
  <Label>Business Pincode (6 digits)</Label>
  <Input
  type="text"
  id="business_pincode"
  name="business_pincode"
  value={formData.business_pincode}
  onChange={handleInputChange}
  required
  pattern="\d{6}"
/>
</FormGroup>
               <Alert isOpen={visible} toggle={onDismiss} color="danger">
                {error}
              </Alert>
        {/* Add other form fields similarly */}
        <Button type="submit" >Submit Details</Button>
      {/* </form> */}
            </CardBody>
          </Form>
           <CardFooter>
           <h4>Terms and Conditions</h4>
           <p>We would like to inform you that the following information has been provided by you as per your discussion with Tide (Tide Platform Private Limited) regarding your loan request. Your information will be shared with their partner Happy and its lending institution, subject to approval. The lending institution will get in touch with you to meet your requirements. We prioritize your privacy and are committed to safeguarding your information. Rest assured, we will only use your details to assess your loan eligibility. Please provide accurate details to ensure the efficient processing of your loan application. By proceeding, you hereby give your consent to share this information.</p>
           </CardFooter>
          </Card>
        </Col>
      </Row>
      
      
    </div>
  );
};

export default CustomerDetailsForm;
