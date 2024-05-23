const express = require("express")
const {
  db_addSubmittedForm,
  db_getforms,
  db_getformresponses,
  db_getformbyformid,
} = require("./db_service")
const cors = require("cors")

const app = express()
const port = 3000

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
  res.status(200).send("This express server is running")
})

app.get("/forms", async function (req, res) {
  try {
    const forms = await db_getforms()
    res.status(200).json(forms)
  } catch (error) {
    res.status(400).json({
      error: error,
    })
  }
})

app.get("/formbyid", async function (req, res) {
  try {
    const msforms_form_id_query = req.query.id ? req.query.id : null
    if (!msforms_form_id_query) {
      res.status(400).json({
        message: "No msforms_form_id specified, nothing to show.",
        correct_syntax: "/formbyid?id=msforms_form_id",
        try_this_form_id: "Q97QyABtNEWjxl_CIYWrmwHypepq4k1ElL_6lzc9HCZUQVYwTUtDUTdOSVVWUk1OSVdKT1lYVU80Ry4u"
      })
      return
    }
    const form = await db_getformbyformid(msforms_form_id_query)
    res.status(200).json(form)
  } catch (error) {
    res.status(500).json({
      error: error,
    })
    throw error
  }
})

app.get("/survey", function (req, res) {
  const url =
    "https://forms.office.com/Pages/ResponsePage.aspx?id=Q97QyABtNEWjxl_CIYWrmwHypepq4k1ElL_6lzc9HCZURUlESUpDMzJMTEs4S09PUE1XWlgwQUc0Vi4u"
  res.redirect(url)
})

app.get("/responses", async function (req, res) {
  try {
    const responses = await db_getformresponses()
    res.status(200).json(responses)
  } catch (error) {
    res.status(400).json({
      error: error,
    })
  }
})

app.post("/submit-form", async function (req, res) {
  try {
    const {
      response_res_data: { formId, responseId },
      submit_timestamp,
      respondent_email,
      question_response,
      form_name,
    } = req.body[0]

    db_addSubmittedForm(
      form_name,
      formId,
      responseId,
      submit_timestamp,
      respondent_email,
      question_response
    )

    res
      .status(200)
      .json({ message: "Form data received and processed successfully" })
  } catch (error) {
    res.status(400).json({ error: "Failed to process form data" })
  }
})

app.listen(port, async () => {
  console.log(`[server] Server is running on http://localhost:${port}`)
})

// console.log("[debug]");
// console.log("form_name: ", form_name);
// console.log("msforms_form_id: ", formId);
// console.log("msforms_response_id: ", responseId);
// console.log("submit_timestamp: ", submit_timestamp);
// console.log("submit_respondent_email: ", respondent_email);
// console.log("submit_response_questions: ", question_response);

// debug
// console.log(await FormService.readAllForms())
// console.log(await FormResponseService.readAllForms())
