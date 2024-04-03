async function test() {
  return new Promise((resolve, reject) => {
    resolve("hellow nodeJs")
  })
}

test().then(res => {
  console.log(res);
})

async function main() {
  let data = await test();
  console.log(data);
}

main()