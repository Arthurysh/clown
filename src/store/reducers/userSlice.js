import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
      isAuth: false,
      deposit: 0,
      name: "",
      balance: 0,
      gameHistory: [],
      flipCoinResult: "",
      randDoorResult: null,
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
    updateBalance(state, action) {
      state.balance = action.payload;
    },
    flipCoin(state, action) {
      const { options } = action.payload;
      const rand = Math.floor(Math.random() * 2);
      state.flipCoinResult = rand === 0 ? "heads" : "tails";
      const bid = (state.deposit * 0.05).toFixed();
      if(options === state.flipCoinResult) {
        state.balance += bid * 2;
      } else if(options !== state.flipCoinResult){
        state.balance -= bid;
      }
      state.gameHistory.unshift({
        game: "Flip Coin",
        result: options === state.flipCoinResult ? `+${bid * 2}` : `-${bid}`,
      });
    },
    guessDoor(state, action) {
      const { doorNumber } = action.payload;
      state.randDoorResult = Math.floor(Math.random() * 3);
      const bid = (state.deposit * 0.05).toFixed();
      if(state.randDoorResult === doorNumber){
        state.balance += bid * 3;
      } else if(state.randDoorResult !== doorNumber){
        state.balance -= bid;
      }
      state.gameHistory.unshift({
        game: "Guess Door",
        result: doorNumber === state.randDoorResult ? `+${bid * 3}` : `-${bid}`,
      });
    }
  },
});

export const { addUser, updateBalance, flipCoin, logOut, guessDoor} = userSlice.actions;

export default userSlice.reducer;