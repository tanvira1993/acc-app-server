const { pool } = require('../../config')

exports.getAllExpenseList = (req, res) => {

    pool.query('SELECT expenses.expense_id,expenses.amount,expenses.created_at,expenses.description,gl.gl_name,projects.project_name FROM expenses LEFT JOIN projects ON projects.project_id = expenses.project_id LEFT JOIN gl ON expenses.gl_id=gl.gl_id ORDER BY expenses.expense_id DESC', (error, results) => {
        if (error) {
            res.json({
                messaage: "err",
                error
              });
        }
        res.status(200).json(results.rows)
    })
  };
  
  exports.DeleteExpenseById = (req, res) => {
    const project = req.params.id
    pool.query('DELETE FROM expenses WHERE expense_id=$1',[project], (error, results) => {
        if (error) {
            res.json({
                messaage: "err",
                error
              });
        }
        res.status(200).json(results.rows)
    })
  };

  exports.DeleteIncomeById = (req, res) => {
    const project = req.params.id
    pool.query('DELETE FROM incomes WHERE income_id=$1',[project], (error, results) => {
        if (error) {
            res.json({
                messaage: "err",
                error
              });
        }
        res.status(200).json(results.rows)
    })
  };

  exports.DeleteProjectById = (req, res) => {
    const project = req.params.id
    pool.query('DELETE FROM projects WHERE project_id=$1',[project], (error, results) => {
        if (error) {
            res.json({
                messaage: "err",
                error
              });
        }
        res.status(200).json(results.rows)
    })
  };

  exports.DeleteGlById = (req, res) => {
    const project = req.params.id
    pool.query('DELETE FROM gl WHERE gl_id=$1',[project], (error, results) => {
        if (error) {
            res.json({
                messaage: "err",
                error
              });
        }
        res.status(200).json(results.rows)
    })
  };

  exports.getAllIncomeList = (req, res)=>{
    pool.query('SELECT incomes.income_id,incomes.amount,incomes.created_at,incomes.description,gl.gl_name,projects.project_name FROM incomes LEFT JOIN projects ON projects.project_id = incomes.project_id LEFT JOIN gl ON incomes.gl_id=gl.gl_id  ORDER BY incomes.income_id DESC', (error, results) => {
        if (error) {
            res.json({
                messaage: "err",
                error
              });
        }
        res.status(200).json(results.rows)
    })
  };

  exports.getAllprojectsList = (req, res)=>{
    pool.query('SELECT projects.project_id,projects.project_name,projects.project_desc, SUM(expenses.amount) AS exTotal,SUM(incomes.amount) AS inTotal FROM projects LEFT JOIN expenses ON projects.project_id = expenses.project_id LEFT JOIN incomes ON projects.project_id = incomes.project_id GROUP BY projects.project_id', (error, results) => {
        if (error) {
            res.json({
                messaage: "err",
                error
              });
        }
        res.status(200).json(results.rows)
    })
  };

  exports.getAllGlList = (req, res)=>{
    pool.query('SELECT gl.gl_id,gl.gl_name,gl.gl_desc, projects.project_name,projects.project_desc, gl.created_at AS Date FROM gl LEFT JOIN projects ON projects.project_id = gl.project_id', (error, results) => {
        if (error) {
            res.json({
                messaage: "err",
                error
              });
        }
        res.status(200).json(results.rows)
    })
  };

  exports.getAllGlListBYProjectId = (req, res)=>{
    const project = req.params.id
    const state = req.params.state
    if(state == 100){
       income = 'expense';
       console.log('100=>',income)
    }
    else {
       income = 'income';
       console.log('200=>',income)

    }
    console.log(project)
    pool.query('SELECT * FROM gl WHERE project_id = $1 AND gl_desc=$2',[project,income], (error, results) => {
        if (error) {
            res.json({
                messaage: "err",
                error
              });
        }
        res.status(200).json(results.rows)
    })
  };

  exports.getAllAmountsBYProject = (req, res)=>{
    const project = req.params.id
    const state = req.params.state
    if(state == 100){
       income = 'expense';
       console.log('100=>',income)

       pool.query('SELECT gl.gl_name,sub.gl_id,gl.gl_desc,sub.exGlTotal FROM ( SELECT SUM(expenses.amount) AS exGlTotal, expenses.gl_id FROM expenses WHERE expenses.project_id=$1 GROUP BY expenses.gl_id) sub JOIN gl ON sub.gl_id = gl.gl_id',[project], (error, results) => {
        if (error) {
            res.json({
                messaage: "err",
                error
              });
        }
        res.status(200).json(results.rows)
    })
    }
    else {
       income = 'income';
       console.log('200=>',income)

       pool.query('SELECT gl.gl_name,sub.gl_id,gl.gl_desc,sub.exGlTotal FROM ( SELECT SUM(incomes.amount) AS exGlTotal, incomes.gl_id FROM incomes WHERE incomes.project_id=$1 GROUP BY incomes.gl_id) sub JOIN gl ON sub.gl_id = gl.gl_id',[project], (error, results) => {
        if (error) {
            res.json({
                messaage: "err",
                error
              });
        }
        res.status(200).json(results.rows)
    })

    }
    console.log(project)
    
  };
  

  exports.projectCreate = (req, res)=>{
    const name = req.body.name
    const desc = req.body.desc
    pool.query(`INSERT INTO
    projects(project_name,project_desc)
    VALUES($1, $2)`, [name,desc],(error, results) => {
      try{
        res.status(200).json(results.rows)
      }
      
      catch(error){
        if (error) {
          res.json({
              messaage: "err",
              error
            });
      }
      }
  })
  }

  exports.glCreate= (req, res)=>{
    const name = req.body.name
    const type = req.body.type
    const project = req.body.project
    pool.query(`INSERT INTO
    gl(project_id,gl_name,gl_desc)
    VALUES($1, $2,$3)`, [project,name,type],(error, results) => {
      try{
        res.status(200).json(results.rows)
      }
      
      catch(error){
        if (error) {
          res.json({
              messaage: "err",
              error
            });
      }
      }
  })
  }

  exports.CreateIncome= (req, res)=>{
    const desc = req.body.desc
    const income = req.body.gl
    const project = req.body.project
    const type = req.body.type
    const amount = req.body.amount
    pool.query(`INSERT INTO
    incomes(project_id,gl_id,amount,trans_type,description)
    VALUES($1, $2,$3,$4,$5)`, [project,income,amount,type,desc],(error, results) => {
      try{
        res.status(200).json(results.rows)
      }
      
      catch(error){
        if (error) {
          res.json({
              messaage: "err",
              error
            });
      }
      }
  })
  }

  exports.CreateExpense= (req, res)=>{
    const desc = req.body.desc
    const expense = req.body.gl
    const project = req.body.project
    const type = req.body.type
    const amount = req.body.amount
    pool.query(`INSERT INTO
    expenses(project_id,gl_id,amount,trans_type,description)
    VALUES($1,$2,$3,$4,$5)`, [project,expense,amount,type,desc],(error, results) => {
      try{
        res.status(200).json(results.rows)
      }
      
      catch(error){
        if (error) {
          res.json({
              messaage: "err",
              error
            });
      }
      }
  })
  }


  exports.getTotalAmounts = (req, res)=>{
    const project = req.params.id
    const state = req.params.state
    if(state == 100){
       income = 'expense';
       console.log('100=>',income)

       pool.query('SELECT SUM ( expenses.amount ) AS exTotal FROM expenses WHERE project_id = $1 GROUP BY project_id',[project], (error, results) => {
        if (error) {
            res.json({
                messaage: "err",
                error
              });
        }
        res.status(200).json(results.rows)
    })
    }
    else {
       income = 'income';
       console.log('200=>',income)

       pool.query('SELECT SUM ( incomes.amount ) AS exTotal FROM incomes WHERE project_id = $1 GROUP BY project_id',[project], (error, results) => {
        if (error) {
            res.json({
                messaage: "err",
                error
              });
        }
        res.status(200).json(results.rows)
    })

    }
    console.log(project)
    
  };
