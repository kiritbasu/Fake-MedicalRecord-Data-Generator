# Fake-MedicalRecord-Data-Generator

Just a simple script to generate fake PII rich data that looks like parts of a medical record.

To install :

- Install NodeJS

- `npm install chance`
- `npm install cluster`

(the last param is the number of concurrent threads you want to run to generate a lot of data in parallel)
- `node medicalrecord-data-gen.js 1`

# Sample output
```JSON
{
  "patient_name": "Luke Reeves",
  "patient_id": "Z032662",
  "birth_date": "4/10/1959",
  "home_phone": "(374) 494-6701",
  "address": {
    "addr1": "932 Ivumep Heights",
    "addr2": "",
    "city": "Lurgewe",
    "state": "IL",
    "zipcode": "95345"
  },
  "diagnosis": [
    "C02.0 Malignant neoplasm of dorsal surface of tongue",
    "D34 Benign neoplasm of thyroid gland"
  ],
  "gender": "Female",
  "marital_status": "Divorced",
  "contact_by": "phone",
  "race": "Asian",
  "social_security_number": "243-78-5524",
  "language": "English",
  "medical_record_number": "MR35614-9426",
  "external_mrn": "MR07852-9155",
  "email": "abu@desli.sv",
  "insurance": {
    "group_number": "A013254",
    "id_number": "15-463-3826",
    "spouse_birth_date": "8/11/1987",
    "spouse_name": "Isabelle Reeves"
  },
  "payments": {
    "patient_account_number": "MR35614-9426",
    "admission_date": "2/16/2017",
    "charge_date": "3/8/2017",
    "purchase_items": [
      "[PRINIVIL TABS] [20 MG] [LISINOPRIL] [1 po qd]",
      "[HUMULIN INJ] [70/30] [INSULIN REG & ISOPHANE HUMAN] [20 units ac breakfast]"
    ],
    "payment_info": {
      "cardholder_name": "Luke Reeves",
      "total_amount": "$1037.82",
      "payment_type": "mc",
      "card_number": "5194943297005452",
      "ccv": "221",
      "exp_date": "01/2022"
    }
  }
}
```
