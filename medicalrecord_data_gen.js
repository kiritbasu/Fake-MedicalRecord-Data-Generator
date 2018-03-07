var Chance = require('chance');
var chance = new Chance();


var p_lastname = chance.last();
var p_patient_id = chance.ssn();
var p_patient_name = chance.first({ gender: "male" }) + " " + p_lastname;

chance.mixin({
'p_address': function() {
    return {
        addr1: chance.address(),
        addr2: chance.pickone(['Apt 1','Apt 6','']),
        city: chance.city(),
        state: chance.state({ country: 'us' }),
        zipcode: chance.zip()
    };
}
});

chance.mixin({
'p_problems': function() {
    return chance.pickset([
      'C00.3 Malignant neoplasm of upper lip, inner aspect',
      'C00.8 Malignant neoplasm of overlapping sites of lip',
      'C02.0 Malignant neoplasm of dorsal surface of tongue',
      'C13.2 Malignant neoplasm of posterior wall of hypopharynx',
      'C46.0 Kaposis sarcoma of skin',
      'D14.0 Benign neoplasm of middle ear, nasal cavity and accessory sinuses',
      'D31.0 Benign neoplasm of conjunctiva',
      'D34 Benign neoplasm of thyroid gland'],2)
    }
});

chance.mixin({
'p_insurance': function() {
    return {
      group_number: "A" + chance.pad(chance.natural({min: 1, max: 100000}), 6),
      id_number: chance.pad(chance.natural({min: 1, max: 99}), 2) + '-' +
                chance.pad(chance.natural({min: 1, max: 999}), 3) + '-' +
                chance.pad(chance.natural({min: 1, max: 9999}), 4),
      spouse_birth_date: chance.birthday({ string: true, year: chance.year({ min: 1950, max: 2000 }) }),
      spouse_name: chance.first({ gender: "female" }) + " " + p_lastname
    }
}
});

chance.mixin({
'p_mrn': function() {
      return  "MR" + chance.pad(chance.natural({min: 1, max: 99}), 2) +
                chance.pad(chance.natural({min: 1, max: 999}), 3) + '-' +
                chance.pad(chance.natural({min: 1, max: 9999}), 4);
}
});

var p_mrn = chance.p_mrn();


function medical_record()
{
    this.patient_name = p_patient_name;
    this.patient_id = p_patient_id;
    this.birth_date = chance.birthday({string: true, type: 'adult'});
    this.home_phone = chance.phone();
    this.address = chance.p_address();
    this.problems = chance.p_problems();
    this.gender = chance.gender();
    this.marital_status = chance.pickone(['Single','Married','Divorced','Widowed']);
    this.contact_by = chance.pickone(['email','phone','postal mail']);
    this.race = chance.pickone(['White','Black', 'Asian', 'American Indian', 'Native Hawaiian']);
    this.social_security_number = chance.ssn();
    this.language = "English";
    this.medical_record_number = p_mrn;
    this.external_mrn = chance.p_mrn();
    this.email = chance.email();
    this.insurance = chance.p_insurance();

}

chance.mixin({
'p_payment_info': function(_patient_name) {
  _cctype = chance.pickone(['visa','dcusc','mc','discover']);
    return {
      cardholder_name: _patient_name,
      total_amount: chance.dollar({max: 2500}),
      payment_type: _cctype,
      card_number: chance.cc({type: _cctype}),
      ccv: chance.pad(chance.natural({min: 1, max: 999}), 3),
      exp_date: chance.exp()
    }
}
});

chance.mixin({
'p_purchase_items': function() {
    return chance.pickset([
      'PRINIVIL TABS 20 MG (LISINOPRIL) 1 po qd',
      'HUMULIN INJ 70/30 (INSULIN REG & ISOPHANE (HUMAN)) 20 units ac breakfast'
    ],2)
}
});

function payment_info(_patient_name, _patient_id, _patient_account_number)
{
    this.patient_id = _patient_id;
    this.patient_account_number = _patient_account_number;
    this.admission_date = chance.date({year: 2017, month: 01, string:true});
    this.charge_date = chance.date({year: 2017, month: 02, string:true}); ;
    this.purchase_items = chance.p_purchase_items();
    this.payment_info = chance.p_payment_info(_patient_name);
}

function print_medical_record() {
  while(true) {
    var instance = new medical_record();
    var pi = new payment_info(p_patient_name, p_patient_id, p_mrn)
    console.log(JSON.stringify(instance));
    console.log(JSON.stringify(pi));
  }
}

/* use this stuff if you want to do performance testing */
var cluster = require('cluster');
  var numCPUs = process.argv[2];

  if(!numCPUs) {console.log("How many processes shall we run? "); process.exit(0); }

  if (cluster.isMaster) {
    // Fork workers.
  for (var i = 0; i < numCPUs; i++) {
  cluster.fork();
  }

  cluster.on('exit', function(worker, code, signal) {
    console.log('worker ' + worker.process.pid + ' died');
 });
} else {
  print_medical_record();
}
