const GithubFetcher =require("./GithubFetcher.js");
const AvatarFetcher =require("./AvatarFetcher.js");

async function main() {
    const avatar=new AvatarFetcher();
    avatar.fetch();

    const github=new GithubFetcher();
    await github.fetch();

}
main();
