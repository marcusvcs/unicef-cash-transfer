import { Component, OnInit } from '@angular/core';
import { Web3Service } from '../../util/web3.service';
import { MatSnackBar } from '@angular/material';
import { normalizePassiveListenerOptions } from '@angular/cdk/platform';

declare let require: any;
const registry_artifacts = require('../../../../build/contracts/Registry.json');
const unitoken_artifacts = require('../../../../build/contracts/UNIToken.json');
export interface ImplementingPartners {
  name: string;
  id: number;
  balance: number;
}

@Component({
  selector: 'app-unitoken-list',
  templateUrl: './unitoken-list.component.html',
  styleUrls: ['./unitoken-list.component.css']
})

export class UniTokenListComponent implements OnInit {
  accounts: string[];
  Registry: any;
  UNIToken: any;


  displayedColumns: string[] = ['id', 'name', 'balance'];
  dataSource = [{id:"",name:0,balance:0}];

  status = '';

  constructor(private web3Service: Web3Service, private matSnackBar: MatSnackBar) {
    console.log('Constructor: ' + web3Service);
  }

  ngOnInit(): void {
    console.log('OnInit: ' + this.web3Service);
    console.log(this);
    this.web3Service.artifactsToContract(registry_artifacts)
      .then((RegistryAbstraction) => {
        this.Registry = RegistryAbstraction;
        this.Registry.deployed().then(registry => {

          console.log("Loaded registry")

          this.web3Service.artifactsToContract(unitoken_artifacts)
            .then((UniTokenAbstraction) => {
              this.UNIToken = UniTokenAbstraction;
              this.UNIToken.deployed().then(unitoken => {

                console.log("Loaded UNIToken")
                this.listIPs().then(list =>{
                  this.dataSource=list;
                });

              });
            });

        });
      });
  }


  setStatus(status) {
    this.matSnackBar.open(status, null, { duration: 3000 });
  }

  async listIPs() {

    let registry = await this.Registry.deployed()
    let unitoken = await this.UNIToken.deployed()
    let list = []

    let id = await registry.lastId()
    id = id.toNumber()

    for (let i = 1; i <= id; i++) {
      let ipAddr = await registry.ImplementingPartnersList(i)
      let ipData = await registry.ImplementingPartners(ipAddr)
      let id = ipData[0]
      let name = ipData[1]
      let balance = await unitoken.balanceOf(ipAddr)
      balance = balance.toNumber()
      list.push({ id: id, name: name, balance: balance });

    }

    return list;

  }
  /*async sendCoin() {
    if (!this.MetaCoin) {
      this.setStatus('Metacoin is not loaded, unable to send transaction');
      return;
    }

    const amount = this.model.amount;
    const receiver = this.model.receiver;

    console.log('Sending coins' + amount + ' to ' + receiver);

    this.setStatus('Initiating transaction... (please wait)');
    try {
      const deployedMetaCoin = await this.MetaCoin.deployed();
      const transaction = await deployedMetaCoin.sendCoin.sendTransaction(receiver, amount, { from: this.model.account });

      if (!transaction) {
        this.setStatus('Transaction failed!');
      } else {
        this.setStatus('Transaction complete!');
      }
    } catch (e) {
      console.log(e);
      this.setStatus('Error sending coin; see log.');
    }
  }

  async refreshBalance() {
    console.log('Refreshing balance');

    try {
      const deployedMetaCoin = await this.MetaCoin.deployed();
      console.log(deployedMetaCoin);
      console.log('Account', this.model.account);
      const metaCoinBalance = await deployedMetaCoin.getBalance.call(this.model.account);
      console.log('Found balance: ' + metaCoinBalance);
      this.model.balance = metaCoinBalance;
    } catch (e) {
      console.log(e);
      this.setStatus('Error getting balance; see log.');
    }
  }

  setAmount(e) {
    console.log('Setting amount: ' + e.target.value);
    this.model.amount = e.target.value;
  }

  setReceiver(e) {
    console.log('Setting receiver: ' + e.target.value);
    this.model.receiver = e.target.value;
  }
  */

}
