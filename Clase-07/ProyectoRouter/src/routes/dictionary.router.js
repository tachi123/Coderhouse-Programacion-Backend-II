import { Router } from 'express';

const router = Router();

router.param('word', async (req, res , next, word) => {
    //let searchWord = await dictionaryService.findWord(word);
    let searchWord = word;
    if(!searchWord){
        req.word = null;
    }else{
        req.word = word + " encontrada";
    }
    next();
})

router.get('/:word', (req, res) => {
    console.log(req.word);
    res.send(req.word);
})


router.put('/:word/:language', (req, res) => {
    console.log(req.params.word);
    res.send(req.params.word);
})

router.delete('/:word/:language', (req, res) => {
    console.log(req.params.word);
    res.send(req.params.word);
})




//Otros endpoint

router.get('*', (req,res) => {
    res.status(404).send("Cannot get the specified word");
})

export default router;