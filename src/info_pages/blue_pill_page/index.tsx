import "../../components/pda/themes.css"
import IndexPage from "../../components/index";

export default function BluePillPage() {
    return <>
        <IndexPage
            title="Index"
            subPages={[{
                title: "page 1",
                description: "des page 1",
                linkPage: <h1>bar page</h1>,
                linkPageUrl: "bar"
            }]}
        />
    </>
}
