import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
      isAuth: true,
      deposit: 200,
      name: "Arrtur",
      balance: 100,
      gameHistory: [
        {
            game: "Flip Coin",
            result: "-100",
          },
          {
            game: "Guess Door",
            result: "-100",
          },
          {
            game: "Flip Coin",
            result: "+100",
          },
          {
            game: "Flip Coin",
            result: "-100",
          },
          {
            game: "Guess Door",
            result: "-100",
          },
          {
            game: "Guess Door",
            result: "+100",
          },],
      flipCoinResult: "",
      randDoorResult: null,
      randNumberResult: 0,
  },
  reducers: {
    addUser(state, action) {
      const { name, deposit } = action.payload;
      state.name = name;
      state.deposit = +deposit;
      state.balance = +deposit;
      state.isAuth = true;
    },
    logOut(state){
      state.isAuth = false;
      state.deposit = 0;
      state.name = "";
      state.balance = 0;
      state.gameHistory = [];
    },
    flipCoin(state, action) {
      const { options } = action.payload;
      const rand = Math.floor(Math.random() * 2);
      state.flipCoinResult = rand === 0 ? "heads" : "tails";
      const bid = (state.deposit * 0.05).toFixed();
      if(options === state.flipCoinResult) {
        state.balance += bid * 2;
      }
      state.gameHistory.unshift({
        game: "Flip Coin",
        result: options === state.flipCoinResult ? `+${bid}` : `-${bid}`,
      });
    },
    guessDoor(state, action) {
      const { doorNumber } = action.payload;
      state.randDoorResult = Math.floor(Math.random() * 3);
      const bid = (state.deposit * 0.05).toFixed();
      if(state.randDoorResult === doorNumber){
        state.balance += bid * 3;
      }
      state.gameHistory.unshift({
        game: "Guess Door",
        result: doorNumber === state.randDoorResult ? `+${bid * 2}` : `-${bid}`,
      });
    },
    guessNumber(state, action) {
      const { selectedNum } = action.payload;
      state.randNumberResult = Math.floor(Math.random() * 10) + 1;
      const bid = (state.deposit * 0.05).toFixed();
      if(state.randNumberResult === selectedNum){
        state.balance += bid * 10;
      } 
      state.gameHistory.unshift({
        game: "Guess Number",
        result: selectedNum === state.randNumberResult ? `+${bid * 9}` : `-${bid}`,
      });
    },
    addBet(state) {
      const bid = (state.deposit * 0.05).toFixed();
      state.balance -= bid;
    }
  },
});

export const { addUser, flipCoin, logOut, guessDoor, guessNumber, addBet} = userSlice.actions;

export default userSlice.reducer;