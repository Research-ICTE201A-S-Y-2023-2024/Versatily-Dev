const { Form, FormResponse } = require("./db_model")

const db_addSubmittedForm = async function (
  form_name,
  formId,
  responseId,
  submit_timestamp,
  respondent_email,
  question_response
) {
  try {
    const existing_form = await Form.findOne({
      where: { msforms_form_id: formId },
    })

    if (existing_form === null) {
      await Form.create({
        form_name: form_name,
        msforms_form_id: formId,
      })
    } else {
      existing_form.form_name = form_name
      await existing_form.save()
      console.log(
        `[INFO] Form already referenced in database.\nForm Name: ${form_name}`
      )
    }

    const existing_formresponse = await FormResponse.findOne({
      where: { msforms_response_id: responseId },
    })

    if (existing_formresponse === null) {
      await FormResponse.create({
        msforms_form_id: formId,
        msforms_response_id: responseId,
        submit_timestamp: submit_timestamp,
        submit_respondent_email: respondent_email,
        submit_response_questions: question_response,
      })
    } else {
      console.log(
        `[INFO] Form response already referenced in database.\nForm Name: ${form_name}\nResponse ID: ${responseId}`
      )
    }

    console.log("[SUCCESS] Response saved to database.")
  } catch (error) {
    console.error("[ERROR] Cannot save response to database.", error)
    throw error
  }
}

const db_getforms = async function () {
  try {
    return await Form.findAll()
  } catch (error) {
    console.error("[ERROR] Cannot fetch data.", error)
    throw error
  }
}

const db_getformresponses = async function () {
  const form_data = await FormResponse.findAll()
  const grouped_responses = groupByFormId(form_data)
  return grouped_responses
}

const db_getformbyformid = async function (msforms_form_id) {
  try {
    const form = Form.findAll({
      where: {
        msforms_form_id: msforms_form_id,
      },
    })
    return form
  } catch (error) {
    console.error("[ERROR] Cannot fetch data.", error)
    throw error
  }
}

function groupByFormId(data) {
  const groupedData = {}

  for (const entry of data) {
    const formId = entry.msforms_form_id
    if (!groupedData[formId]) {
      groupedData[formId] = []
    }
    groupedData[formId].push(entry)
  }

  return groupedData
}

//my progess: check bard

module.exports = {
  db_addSubmittedForm,
  db_getforms,
  db_getformresponses,
  db_getformbyformid
}
