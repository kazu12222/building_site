const func = async () => {
  const response = await window.versions.ping();
  console.log(response); // 'pong' と出力
};

const btn3 = document.getElementById("btn3");
btn3.addEventListener("click", async () => {
  const property = await window.versions.puppeteer();
  console.log(property);
  for (i = 0; i < property.build_src.length; i++) {
    const build_src = property.build_src[i];
    const link = property.link[i];
    const address = property.address[i];
    const traffic = property.traffic[i];
    const price = property.price[i];
    const land_area = property.land_area[i];
    const build_area = property.build_area[i];
    const build_date = property.build_date[i];
    const site = property.site[i];
    let str = `<div style ="border: 1px solid #ddd; border-bottom: none;">
    <h2 style="border-bottom: 1px solid #ddd;
    padding: 9px 10px 7px;
    background: #F6F5E7;
    text-decoration: none;
    color: #333;
    font-size: 16px;">
      <p style="margin: 0;
      padding: 0;
      font-size: 1em;">
      <a href='${link}' target="_blank">
          ${address}</a>
      </p>
    </h2>
    <div class="itemBody">
      <p class="itemDescription"></p>
      <div class="clearfix">
        <div style="float: left;
        margin-right: 9px;
        width: 227px;">
          <p class="mainImageRect">
            <a href="/chuko/ikkodate/fukushima/aizuwakamatsushi/suumof_70599242/" target="_blank" data-pbcd-track-on-click="">
              <img alt=A src=${build_src} height="127" width="170">
            </a>
          </p>
        </div>
        <div>
          <dl style="width: 100%;
          line-height: 1.5;">
          <dt style="background: #f1f9c5;
          font-weight: normal;
          color: #224619;">価格</dt>
            <dd style="font-size: 1.25em;
            font-weight: bold;
            color: #ec5300;">${price}</dd>
          <dt style="background: #f1f9c5;
          font-weight: normal;
          color: #224619;">所在地</dt>
            <dd>${address}</dd>
          <dt style="background: #f1f9c5;
          font-weight: normal;
          color: #224619;">交通</dt>
            <dd>${traffic}</dd>
          <dt style="background: #f1f9c5;
          font-weight: normal;
          color: #224619;">土地面積</dt>
            <dd style="padding-left: 195;">${land_area}</dd>
          <dt style="background: #f1f9c5;
          font-weight: normal;
          color: #224619;
          padding-left: 234;">建物面積</dt>
            <dd style="padding-left: 195;">${build_area}</dd>
          <dt  style="background: #f1f9c5;
          font-weight: normal;
          color: #224619;
          padding-left: 234;">築年月</dt>
            <dd style="padding-left: 195;">${build_date}</dd>
          <dt  style="background: #f1f9c5;
          font-weight: normal;
          color: #224619;
          padding-left: 234;">参照サイト</dt>
            <dd style="padding-left: 195;">${site}</dd>
          </dl>
        </div>
      </div>
  </div>`;
    let div = document.createElement("div");
    div.innerHTML = str; //html要素に変換
    document.body.appendChild(div); //bodyに追加
  }
});

func();
