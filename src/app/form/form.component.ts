import { Subscription } from 'rxjs/Subscription';
import { TwddServiceService } from './../twdd-service.service';

import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})

export class FormComponent implements OnInit {
  @Output() closeForm = new EventEmitter();
  twddForm: FormGroup;
  bankNum = ['001 中央信託', '003 交通銀行', '004 台灣銀行', '005 土地銀行',
        '006 合庫商銀', '007 第一銀行', '008 華南銀行', '009 彰化銀行',
        '010 華僑銀行', '011 上海銀行', '012 台北富邦', '013 國泰世華',
        '016 高雄銀行', '017 兆豐商銀', '018 農業金庫', '021 花旗銀行',
        '024 運通銀行', '025 首都銀行', '039 荷蘭銀行', '040 中華開發',
        '050 臺灣企銀', '051 台北商銀', '052 新竹商銀', '053 台中商銀',
        '054 京城商銀', '056 花蓮企銀', '057 台東企銀', '075 東亞銀行',
        '081 匯豐銀行', '083 渣打銀行', '087 標旗銀行', '101 台北一信',
        '102 華泰銀行', '103 臺灣新光商銀', '104 台北五信', '106 台北九信',
        '108 陽信銀行', '114 基隆一信', '115 基隆二信', '118 板信銀行',
        '119 淡水一信', '120 淡水信合社', '124 宜蘭信合社', '127 桃園信合社',
        '130 新竹一信', '132 新竹三信', '139 竹南信合社', '146 台中二信',
        '147 三信銀行', '151 第七商銀', '158 彰化一信', '161 彰化五信',
        '162 彰化六信', '163 彰化十信', '165 鹿港信合社', '178 嘉義三信',
        '179 嘉義四信', '188 台南三信', '203 高雄二信', '204 高雄三信',
        '215 花蓮一信', '216 花蓮二信', '222 澎湖一信', '223 澎湖二信',
        '224 金門信合社', '512 雲林漁會', '515 嘉義漁會', '517 南市區漁會',
        '518 南縣漁會', '521 永安漁會', '521 興達港漁會', '521 林園區漁會',
        '521 彌陀漁會', '523 東港漁會', '523 琉球區漁會', '523 林邊區漁會',
        '524 新港漁會', '525 澎湖區漁會', '605 高雄市農會', '613 名間農會',
        '614 永靖農會', '614 二林農會', '614 員林農會', '614 竹塘農會',
        '614 秀水農會', '614 埔心農會', '614 埤頭鄉農會', '616 崙背鄉農會',
        '616 四湖農會', '616 口湖農會', '616 斗六農會', '616 台西農會',
        '616 大埤農會', '616 莿桐農會', '616 西螺農會', '616 古坑農會',
        '616 二崙農會', '616 褒忠農會', '616 虎尾農會', '616 斗南農會',
        '617 六腳農會', '617 水上鄉農會', '617 布袋鎮農會', '617 梅山農會',
        '617 朴子農會', '617 民雄農會', '617 東石農會', '617 嘉義農會',
        '617 太保農會', '617 溪口農會', '617 新港農會', '617 番路農會',
        '617 鹿草農會', '617 竹崎農會', '617 大林農會', '617 義竹農會',
        '617 大埔農會', '618 善化鎮農會', '618 佳里鎮農會', '618 新營農會',
        '618 歸仁農會', '618 西港農會', '618 永康農會', '618 將軍農會',
        '618 六甲農會', '618 北門農會', '618 鹽水農會', '618 玉井農會',
        '619 鳳山市農會', '619 梓官農會', '619 永安農會', '619 杉林農會',
        '619 阿蓮農會', '619 林園農會', '619 湖內農會', '619 旗山農會',
        '619 仁武農會', '619 大寮農會', '619 路竹農會', '619 岡山農會',
        '619 大社農會', '619 橋頭農會', '619 彌陀農會', '619 茄萣農會',
        '619 田寮農會', '619 燕巢農會', '619 甲仙農會', '619 美濃農會',
        '619 鳥松農會', '620 新埤農會', '620 里港鄉農會', '620 麟洛農會',
        '620 恒春農會', '620 枋山農會', '620 南州農會', '620 琉球農會',
        '620 滿州農會', '620 東港鎮農會', '620 崁頂鄉農會', '620 九如鄉農會',
        '621 富里鄉農會', '621 壽豐農會', '621 吉安農會', '621 新秀農會',
        '622 太麻里農會', '622 台東農會', '622 關山農會', '622 鹿野農會',
        '622 東河農會', '622 成功農會', '622 池上農會', '622 長濱農會',
        '624 澎湖農會', '625 台中市農會', '627 連江縣農會', '700 中華郵政',
        '803 聯邦銀行', '804 中華銀行', '805 遠東銀行', '806 復華銀行',
        '807 建華銀行', '808 玉山銀行', '809 萬泰銀行', '810 寶華銀行',
        '812 台新銀行', '814 大眾銀行', '815 日盛銀行', '816 安泰銀行',
        '822 中國信託', '825 慶豐銀行'];
  bankValue = [];
  mytype = 1; //1: 現金匯款, 2:現金禮券
  isSend = false;
  wait = false;
  isCheck = false;
  user = {};
  actualAmount:number; //實際兌換獎金
  balance:number; //餘額

  constructor(private fb: FormBuilder, private twddService: TwddServiceService) {
    this.twddForm = fb.group({
      name: "",
      idno: "",
      address: "",
      type: "現金匯款",
      coupon: "SOGO禮券",
      bankCode: "",
      bankName: "",
      bankAccount: "",
      _token: "",
      check: false
    })
  }

  ngOnInit() {
    this.twddForm.value['_token'] = this.twddService.getVcode();
    this.user = this.twddService.getUser();
    this.bankValue = this.bankNum.map((va) => va.slice(0, 3));

    // this.getBank(); //2017
    gapage('申請獎金');
  }

  //讀取銀行代碼資料
  getBank() {
    this.twddService.getBank().then(res => {
      this.bankNum = res;
      this.bankValue = this.bankNum.map((va) => va.slice(0, 3));
    })
  }

  checkId(string) {
    let re = /^[A-Z]\d{9}$/;
    if (re.test(string))
      return true;
    else
      return false;
  }

  onSubmit() {
    if(this.user['income']==0){
      alert('您目前無任何獎金可申請');
      return;
    }

    if(this.user['income']<100){
      alert('因手續費問題,低於100元無法兌換');
      return;
    }
    
    if (!this.twddForm.value.check) {
      alert('請同意活動條款及獎金稅務說明及發放說明');
      return;
    }
    if (this.wait) {
      return
    }

    this.wait = true;
    this.onCheckData();
    gaclick('送出並確認');
  }

  onCheckData() {
    if(this.mytype==1){//現金算法
      this.actualAmount = this.user['income']-30;
      this.balance = 0;
    }else{//禮券算法
      if( this.user['income']<130){
        alert('扣除30元手續費後，金額低於100元，無法兌換');
        this.wait = false;
        return;
      }
      let amount = this.user['income']-30;
      this.balance = amount - Math.floor((amount/100))*100;
      this.actualAmount = amount - this.balance;
    }

    $('.check-popup').fadeIn('fast');
  }

  onChange(evt){
    // console.log('change: '+evt);
    if(evt==1){
      $('.ty1').css('display','block');
      $('.ty2').css('display','none');
    }else if(evt==2){
      $('.ty2').css('display','block');
      $('.ty1').css('display','none');
    }
  }


  //關閉確認視窗,不上傳資料
  closeBtn() {
    $('.check-popup').fadeOut('fast');
    this.wait = false;
    gaclick('取消送出');
  }

  //資料上傳後回到上個步驟
  onSubmitReady() {
    //test ======================================
    // this.twddService.changeUser(this.user);
    // this.closeForm.emit();
    //test ======================================

    this.user['apply'] += (this.actualAmount+30);
    this.user['income'] = this.balance;
    this.user['total'] = this.user['apply'] + this.balance;

    this.twddService.sendApply(this.twddForm.value).subscribe(res => {

      this.closeForm.emit();

      if (res.status == 0) {
        setTimeout(()=> {
          alert(res.msg);
        }, 10);
        
        this.wait = false;
      }
      if (res.status == 1) {
        setTimeout(()=> {
          alert('資料已上傳');
        }, 10);
        this.twddService.changeUser(this.user);
      }
    });

    gaclick('確認後送出');
  }

}
