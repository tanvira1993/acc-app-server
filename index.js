const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const accController = require('./api/Controllers/accController');
const { pool } = require('./config')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

app.route('/deleteProject/:id').get(accController.DeleteProjectById);
app.route('/deleteGl/:id').get(accController.DeleteGlById);
app.route('/deleteExGl/:id').get(accController.DeleteExGlById);
app.route('/deleteIncome/:id').get(accController.DeleteIncomeById);
app.route('/deleteExpense/:id').get(accController.DeleteExpenseById);

app.route('/TotalAmounts/:id/:state').get(accController.getTotalAmounts);
app.route('/projectAmountsList/:id/:state').get(accController.getAllAmountsBYProject);
app.route('/glByProjectId/:id/:state').get(accController.getAllGlListBYProjectId);
app.route('/fundTransfer').post(accController.fundTransfer);
app.route('/extTransaction').post(accController.extTransaction);
app.route('/exGlByGlId/:id').get(accController.getAllexGlByGlId);
app.route('/exGlByExGlId/:id/:state').get(accController.getGroupexGlByExGlId);
app.route('/allEntryByGlId/:id/:state').get(accController.getGroupGlByGlId);
app.route('/totalvalue').get(accController.totalvalue);


app.route('/project').get(accController.getAllprojectsList);
app.route('/project').post(accController.projectCreate);

app.route('/gl').get(accController.getAllGlList);
app.route('/gl').post(accController.glCreate);

app.route('/exGl').get(accController.getAllExGlList);
app.route('/exGl').post(accController.exGlCreate);

app.route('/income').get(accController.getAllIncomeList);
app.route('/income').post(accController.CreateIncome);

app.route('/expense').get(accController.getAllExpenseList);
app.route('/expense').post(accController.CreateExpense);

app.get("/", (req, res) => {
  res.json({
    key: "I am value"
  });
});

// Start server
app.listen(process.env.PORT || 3070, () => {
  console.log(`Server listening From Tanvir Ahamed`)
})