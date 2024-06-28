import React, { useRef, useState } from 'react';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';
import backgroundPattern from "../../images/background-pattern.jpg";
import { Link } from "react-router-dom";

function GeminiModal() {
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null); // State to hold the image preview URL

    const MODEL_NAME = "gemini-1.0-pro-vision-latest";
    const API_KEY = "AIzaSyCkX45Er7h7LQQb3MoGMP1np0TNo9we7oU";

    const runGenerativeAI = async (imageData) => {
        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: MODEL_NAME });
        const generationConfig = {
            temperature: 0.9,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
        };

        const safetySettings = [
            { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
            { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
            { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
            { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
        ];

        const parts = [
            {
                text: "Accurately identify the dish in the photo and provide the appropriate recipe (ingredients and instructions) of the dish in the photo. Reply in Vietnamese. Reply in this format, here is a sample text:\n" +
                    "\"Bánh pizza thập cẩm. \n" +
                    "\"**Nguyên liệu:** * 1 đế bánh pizza * 1 thìa canh dầu ô liu * 1/2 chén sốt pizza * 1/2 chén phô mai mozzarella * 1/4 chén phô mai cheddar * 1/4 chén phô mai Parmesan * 1/4 chén thịt nguội * 1/4 chén xúc xích * 1/4 chén nấm * 1/4 chén hành tây * 1/4 chén ớt chuông xanh * 1/4 chén ớt chuông đỏ " +
                    "**Hướng dẫn:** 1. Làm nóng lò ở 200 độ C. 2. Đặt đế bánh pizza lên khay nướng đã chống dính. 3. Phết dầu ô liu lên đế bánh pizza. 4. Đổ sốt pizza lên đế bánh pizza. 5. Rắc phô mai mozzarella, cheddar và Parmesan lên trên. 6. Xếp thịt nguội, xúc xích, nấm, hành tây, ớt chuông xanh và ớt chuông đỏ lên trên. 7. Nướng bánh pizza trong lò trong 10-12 phút, hoặc cho đến khi phô mai tan chảy và đế bánh pizza có màu vàng nâu. 8. Lấy bánh pizza ra khỏi lò và để nguội trong vài phút trước khi thưởng thức.\""
            },
            { inlineData: { mimeType: "image/jpeg", data: imageData } },
        ];

        const result = await model.generateContent({
            contents: [{ role: "user", parts }],
            generationConfig,
            safetySettings,
        });

        const response = result.response;
        setLoading(false);
        setContent(response.text());
        console.log(response.text());
    };

    const inputRef = useRef();

    const handleOnChange = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            setContent('');
            const file = event.target.files[0];
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                const imageData = reader.result.replace(/^data:image\/[a-z]+;base64,/, "");
                setImagePreview(reader.result); // Set the image preview URL for display
                runGenerativeAI(imageData);
            };
            reader.readAsDataURL(file);
            setLoading(true);
        }
    };

    const onChooseFile = () => {
        inputRef.current.click();
    };

    const removeFile = () => {
        setSelectedFile(null);
        setContent('');
        setImagePreview(null); // Clear the image preview
    };

    const Loading = () => {
        if (loading) {
            return (
                <div className="loading" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
                    <img src={require('../../images/ezgif.com-optimize.gif')} alt="loading" style={{ border: '2px solid #ffc43f', borderRadius: '10px' }} />
                </div>
            )
        }
        return null;
    };

    function formatRecipe(text) {
        const recipe = {
            food: "",
            ingredient: [],
            instructions: []
        };

        const parts = text.split('**Hướng dẫn:**');
        let ingredientsPart = parts[0];
        const instructionsPart = parts[1] || '';

        const foodNameEndIndex = ingredientsPart.indexOf('**Nguyên liệu:');
        if (foodNameEndIndex !== -1) {
            recipe.food = ingredientsPart.substring(0, foodNameEndIndex).trim();
            ingredientsPart = ingredientsPart.substring(foodNameEndIndex + '**Nguyên liệu:'.length).trim();
        }

        ingredientsPart.split('*').forEach(item => {
            const cleanedItem = item.trim();
            if (cleanedItem.length > 0) {
                recipe.ingredient.push(cleanedItem);
            }
        });

        const lines = instructionsPart.split('\n');
        lines.forEach(line => {
            const cleanedLine = line.trim();
            if (/^\d+\./.test(cleanedLine)) {
                recipe.instructions.push(cleanedLine);
            }
        });

        return recipe;
    }

    const renderContent = () => {
        if (content !== '') {
            const recipe = formatRecipe(content);
            return (
                <div>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <h2>{recipe.food || 'Recipe'}</h2>
                    </div>
                    <h4>Ingredients</h4>
                    <ul>
                        {recipe.ingredient.map((ingredient, index) => (
                            <li key={index}>{ingredient}</li>
                        ))}
                    </ul>
                    <h4>Instructions</h4>
                    <ul style={{ listStyleType: 'none' }}>
                        {recipe.instructions.map((instruction, index) => (
                            <li key={index}>{instruction}</li>
                        ))}
                    </ul>
                </div>
            );
        }
    };

    return (
        <div className="container" style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '10px' }}>
            {/* <section className="py-5 mb-5" style={{ background: `url(${backgroundPattern})` }}>
                <div className="container-fluid">
                    <div className="d-flex justify-content-between">
                        <h1 className="page-title pb-2">Recipes</h1>
                        <nav className="breadcrumb fs-6">
                            <Link className="breadcrumb-item nav-link" href="#">Home</Link>
                            <Link className="breadcrumb-item nav-link" href="#">Pages</Link>
                            <span className="breadcrumb-item active" aria-current="page">Recipes</span>
                        </nav>
                    </div>
                </div>
            </section> */}
            <div className="gemini-header" style={{ border: '1px solid #ffc43f', padding: '20px', borderRadius: '10px', display: 'flex', justifyContent: 'space-between' }}>
                <h4>Create Recipes - GEMINI AI Model</h4>
                <img src={require('../../images/Gemini_language_model_logo.png')} alt="gemini" style={{ height: '30px', width: '80px', marginRight: '20px' }} />
            </div>
            <div className="upload-btn-wrapper">
                {!imagePreview ? (
                    <div>
                        <input type="file" id="imageInput" ref={inputRef} style={{ display: 'none' }}
                            onChange={handleOnChange} />
                        <button className="file-btn" onClick={onChooseFile}>
                            <span className="material-symbols-outlined">
                                upload
                            </span>
                            Upload Image
                        </button>
                    </div>
                ) : (<img src={imagePreview} alt="Preview" style={{ width: '20%', height: 'auto', borderRadius: '10px' }} />)}

                {selectedFile && (<div className='selected-file'>
                    <p>{selectedFile.name}</p>
                    <button onClick={removeFile}>
                        <span className="material-symbols-outlined">
                            delete
                        </span>
                    </button>
                </div>)}
            </div>
            {Loading()}
            <div className="gemini-output">
                {content && (<div className='gemini-output-content'
                    style={{ border: '1px solid #ffc43f', padding: '20px', borderRadius: '10px' }}>
                    <p>{renderContent()}</p>
                </div>)}
            </div>
        </div>
    );
}

export default GeminiModal;
