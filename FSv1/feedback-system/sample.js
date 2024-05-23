

const samplejsonstringfrompowerautomate = [
    {
        "response_res_data": {
            "formId": "Q97QyABtNEWjxl_CIYWrmwHypepq4k1ElL_6lzc9HCZUQVYwTUtDUTdOSVVWUk1OSVdKT1lYVU80Ry4u",
            "responseId": 13
        },
        "submit_timestamp": "5/16/2024 11:05:21 AM",
        "respondent_email": "anonymous",
        "question_response": [
            {
                "store_visit_freq": "Weekly",
                "purch_prod_tier": "[\"Musical Instruments\",\"CDs\",\"Accessories (strings, picks, cables, etc.)\"]",
                "prod_var_satisf": "Somewhat satisfied",
                "prod_qual_satisf": "Very low quality",
                "store_layorg_satisf": "No, somewhat difficult",
                "staff_serv_satisf": "Very poor",
                "store_clean_satisf": "No, somewhat dissatisfied",
                "store_recom_prob": "Neither likely nor unlikely",
                "opinion_improv": "Do better",
                "opinion_addtl": "No"
            }
        ],
        "form_name": "Customer Satisfaction Survey for Aoki Music Store"
    }
]

const form = samplejsonstringfrompowerautomate[0];

const {
  response_res_data: { formId, responseId },
  submit_timestamp,
  respondent_email,
  question_response,
  form_name,
} = form;

