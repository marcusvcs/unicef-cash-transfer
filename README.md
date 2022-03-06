# Unicef Cash Transfer

This repository have a small application showing the use of a token to keep track of cash transfers to Implementing Partners (IP)

It uses an Ethereum network and smart contracts to register and send tokens from UNICEF to the IPs

To run:

```
npm install
```

Install truffle and Angular:

```
npm install -g truffle
npm install -g @angular/cli
npm install -g ganache-cli
```

Run ganache-cli:

```
ganache-cli
```

Compile and install the contracts
```
truffle compile && truffle migrate --reset
```

To run the Angular application:

```
npm start
```