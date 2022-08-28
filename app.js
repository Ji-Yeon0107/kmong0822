let currentProductId = 0;
let mailBody = "";
const sendeEmailDetailBtn = document.querySelector(".send-email-detail");
const mailSubject = "요청"; // 원하는 문구로 수정
const productDetail = document.querySelector("#productDetail");
const productListEle = document.querySelector("#productList");

const productList = [
  {
    CarrierGas: [
      {
        id: 0,
        img: "GC_08.png",
        PN: "1603237070",
        name: "Split Vent Trap",
        replacement: "Every 6 month",
        videoURL: "https://www.youtube.com/watch?v=Ayz9pkSKR4g",
        select: false,
      },
      {
        id: 1,
        img: "GC_09.png",
        PN: "5060-9084",
        name: "Moisture trap Trap, Molecular Sieve",
        replacement: "Every 6-12 month",
        videoURL: "https://www.youtube.com/watch?v=Ayz9pkSKR4g",
        select: false,
      },
      {
        id: 2,
        img: "GC_10.png",
        PN: "OT3-2",
        name: "Oxygen trap",
        replacement: "Every 6-12 month",
        videoURL: "https://www.youtube.com/watch?v=Ayz9pkSKR4g",
        select: false,
      },
      {
        id: 3,
        img: "GC_11.png",
        PN: "HT200-2",
        name: "Hydrocarbon trap",
        replacement: "Every 6-12 month",
        videoURL: "https://www.youtube.com/watch?v=Ayz9pkSKR4g",
        select: false,
      },
    ],
  },
];

// 이메일전송
sendeEmailDetailBtn?.addEventListener("click", () => {
  if (currentProductId === -1) {
    window.open(`mailto:mkt@youngincm.com`);
  } else {
    window.open(
      `mailto:mkt@youngincm.com?subject=${mailSubject}&body=${mailBody}`
    );
  }
});

function setEmailContent(currentProductId) {
  const selectedItems = productList[0].CarrierGas?.filter(
    (item) => item.select === true
  );

  const selctedItemsContent = selectedItems.map(
    (item, index) => `
${index + 1}. 
  PN: ${item.PN},
  Name: ${item.name},
  Replacement Schedule: ${item.replacement}
  `
  );
  mailBody = selctedItemsContent.join("%0D%0A");
}
// table에 상품리스트를 담는다
(function () {
  const tableBody = document.querySelector("#tableBody");
  if (!tableBody) return;

  const products = productList[0]?.CarrierGas?.map(
    (data) =>
      `
    <tr>
    <td style={{textAlign:'center'}}><input type="checkbox" class="select" data-id=${
      data.id
    }
    /></td>
    <td>
        <div class="info detail-button move" data-id=${data.id}>
          <img
            class="info-img"
            src="./img/${data.img}"
            alt="${data.name}"
          />
          <div class="info__right">
            <div>${data.PN}</div>
            <div>${data.name}</div>
          </div>
        </div>
    </td>
    <td>
     <div class="detail-btn move" data-id=${data.id}><img src="./img/ui/${
        data.replacement !== "Every 6 month" ? "timer" : "timer_half"
      }.png" alt="timer" style="width:30px" />${data.replacement} </div>
    </td>
    <td><a href=${
      data.videoURL
    }><img src="./img/ui/play.png" alt="play" style="width:30px" /></a></td>
  </tr>`
  );
  tableBody.innerHTML = products.join("");
})();

// 상품 정보를 상품 리스트 화면에 추가한다
function appendProductDetail() {
  const productDetailDesc = document.querySelector("#productDetailDesc");

  const currentProduct = productList[0]?.CarrierGas?.find(
    (item) => item.id === Number(currentProductId)
  );
  if (!currentProduct) return;
  if (!productDetailDesc) return;

  productDetailDesc.innerHTML = `
  <div class="desc-container">
    <div>${Object.keys(productList[0])}</div>
    <div>
    <div>
    <input type="checkbox" class="detail-select"/></div>
    <img class="detail-img" src="./img/${
      currentProduct.img
    }" width="300px" alt=${currentProduct.name} /></div>
    <div><span class="strong">P/N</span> ${currentProduct.PN}</div>
    <div>${currentProduct.name}</div>
    <div><span class="strong">Replacement Schedule</span><br/>
  ${currentProduct.replacement}</div>
    <div class="flex"">How to Replace <a href=${
      currentProduct.videoURL
    }><img src="./img/ui/play.png" alt="play" style="width:30px" /></a></div>
    </div>
  `;
}

// 화살표로 상품상세 이동
function changeCurrentID(e) {
  if (e.currentTarget.matches(".move")) {
    currentProductId = e.currentTarget.dataset.id;
  }
  if (e.currentTarget.id === "prev") {
    if (currentProductId <= 0) return;
    currentProductId = Number(currentProductId) - 1;
  }
  if (e.currentTarget.id === "next") {
    if (currentProductId >= productList[0]?.CarrierGas?.length - 1) return;
    currentProductId = Number(currentProductId) + 1;
  }

  setEmailContent(currentProductId);

  appendProductDetail();
}

// 상품 리스트에서 상품을 클릭하면 해당 상품의 상세 정보로 이동
(function () {
  const productDetail = document.querySelector("#productDetail");
  const productListEle = document.querySelector("#productList");
  const detailButton = document.querySelectorAll(".detail-button");
  const listButton = document.querySelector(".list-button");

  function handleClassName(hide, show) {
    hide.classList = "hidden";
    show.classList.remove("hidden");
  }
  for (let i = 0; i < detailButton.length; i++) {
    detailButton[i]?.addEventListener("click", (e) => {
      handleClassName(productListEle, productDetail);
      changeCurrentID(e);
      checkSelectButtonChecked();
      handleSelectCheked();
      setEmailContent(currentProductId);
    });
  }

  listButton?.addEventListener("click", () => {
    handleClassName(productDetail, productListEle);
    currentProductId = 0;
    checkSelectButtonChecked();
    handleSelectCheked();
  });

  appendProductDetail();
})();

// 상품 상세페이지에서 좌우 버튼을 누르면 상품이 바뀜
(function () {
  const prevButton = document.querySelector("#prev");
  const nextButton = document.querySelector("#next");

  prevButton?.addEventListener("click", (e) => {
    changeCurrentID(e);
    handleSelectCheked();
    checkSelectButtonChecked();
  });
  nextButton?.addEventListener("click", (e) => {
    changeCurrentID(e);
    handleSelectCheked();
    checkSelectButtonChecked();
  });
})();

// checkbox 체크/체크해제
function handleSelectCheked() {
  const selectButton = document.querySelectorAll(".select");
  const detailSelectButton = document.querySelector(".detail-select");

  for (let i = 0; i < selectButton?.length; i++) {
    selectButton[i]?.addEventListener("click", (e) => {
      productList[0].CarrierGas[e.target.dataset.id].select =
        !productList[0].CarrierGas[e.target.dataset.id].select;

      setEmailContent();
    });
  }
  detailSelectButton?.addEventListener("click", () => {
    productList[0].CarrierGas[currentProductId].select =
      !productList[0].CarrierGas[currentProductId].select;

    setEmailContent();
  });
}
handleSelectCheked();

// checkbox check상태
function checkSelectButtonChecked() {
  const selectButton = document.querySelectorAll(".select");
  const detailSelectButton = document.querySelector(".detail-select");

  if (productDetail?.className === "hidden") {
    for (i = 0; i < productList[0]?.CarrierGas?.length; i++) {
      selectButton[i].checked = productList[0].CarrierGas[i].select;
    }
    return;
  }
  if (productListEle?.className === "hidden") {
    detailSelectButton.checked =
      productList[0].CarrierGas[currentProductId].select;
  }
}
checkSelectButtonChecked();
