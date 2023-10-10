const express =  require('express')
const app = express()
const { Configuration, OpenAIApi } = require("openai")

app.use(express.static('public'))

const openai = new OpenAIApi(new Configuration({
    // replace your-api-key with your API key from ChatGPT
    apiKey: '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'
}))

app.post('/chat', async (req, res)=> {   
    try {
      const resp = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
          messages: [
            { role: "user", content: req.body.question}
          ]  
      })           
          
      res.status(200).json({message: resp.data.choices[0].message.content})
    } catch(e) {
        res.status(400).json({message: e.message})
    }
  })

app.listen(5000, ()=> {
    console.log("Server is active")
})