import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import SetupForm from '../../components/SetupForm/SetupForm'
import OptionButton from '../../components/OptionButton/OptionButton'

function SetupPage() {
    return (
        <>
            <Header />
            <main>
                <SetupForm title="Starting from" subtitle="Select your starter score">
                    <OptionButton val={501}>501</OptionButton>
                    <OptionButton val={301}>301</OptionButton>
                </SetupForm>
            </main>
            <Footer />
        </>
    )
}

export default SetupPage
