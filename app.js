function getRandomValue(min, max){
    return Math.floor(Math.random() * (max - min)) + min
}
let currentRound = 0

const app = Vue.createApp({
    data(){
        return{
            playerHealth: 100,
            monsterHealth: 100,
            currentRound: 0,
            monsterWins: 0,
            playerWins: 0,
            winner: null,
            logMessages: []
        }
    },
    methods:{
        attackMonster(){
            this.currentRound ++
            const attackValue=getRandomValue(5, 12)
               this.monsterHealth -= attackValue;
               if (this.monsterHealth < 0){
                   this.monsterHealth = 0
               }
               this.addLogMessages('player', 'attacks', attackValue)
                 this.attackPlayer()
         
        },
        attackPlayer(){
            const attackValue = getRandomValue(2, 14)
            this.playerHealth -= attackValue
            if(this.playerHealth < 0){
                this.playerHealth = 0
            }
            this.addLogMessages('monster', 'attacks', attackValue)
       
    
        },
        specialAttack(){
            this.currentRound++
            const attackValue = getRandomValue(10, 20)
            this.monsterHealth -= attackValue
            if(this.monsterHealth < 0){
                this.monsterHealth = 0
            }
            this.addLogMessages('player', 'special-attack', attackValue)
            this.attackPlayer()
   
        },
        healPlayer(){
            this.currentRound++
            const healValue = getRandomValue(5, 25);
            if (this.playerHealth + healValue <100){
                this.attackPlayer()
                this.playerHealth += healValue

            } else {
                this.playerHealth = 100
            }
            this.logMessages('player', 'heals', healValue)
            this.attackPlayer()
        },
    
        resetGame(){
            this.playerHealth = 100
            this.monsterHealth = 100,
            this.currentRound = 0,
            this.winner = null,
            this.logMessages = []
        },
        surrender(){
            this.playerHealth = 0;
        },
        addLogMessages(who, what, value){
            this.logMessages.unshift({
                actionBy: who,
                actionType: what,
                actionValue: value
            })
        }
    },
    computed:{
        monsterBarStyles(){
            return {width: this.monsterHealth + '%'}
        },
        playerBarStyles(){
            return { width: this.playerHealth + '%'}
        },
        specialAttackOk(){
            return this.currentRound % 3 !== 0
        }
    },
    watch:{
        playerHealth(value){
            if(value <= 0 && this.monsterHealth <= 0){
                this.winner = "draw"
            }else if (value <= 0){
             this.monsterWins ++
             this.winner ="monster"
            }
        },
        monsterHealth(value){
            if(value < 0  && this.playerHealth <= 0){
            this.winner = "draw"
            } else if (value <= 0 ){
               this.playerWins ++
               this.winner = "player"
            }
        }
    }
    
});
app.mount('#game')