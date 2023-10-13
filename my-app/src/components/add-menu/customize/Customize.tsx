import React, { useState } from 'react';

const CustomizationComponent: React.FC = () => {
    const [isAddClicked, setIsAddClicked] = useState(false);
    const [option, setOption] = useState<string>("");
    const [priceChange, setPriceChange] = useState<string>("");

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid black', padding: '10px' }}>
                <div>カスタマイズを追加</div>
                {!isAddClicked && <button onClick={() => setIsAddClicked(true)}>+</button>}
            </div>

            {isAddClicked && (
                <div>
                    <input type="text" placeholder="Customize name..." />
                    
                    <div>
                        <label>オプション選択方式: </label>
                        <select value={option} onChange={(e) => setOption(e.target.value)}>
                            <option value="">--選択してください--</option>
                            <option value="fromList">候補から選択</option>
                            <option value="byNumber">個数で選択</option>
                        </select>
                    </div>

                    {option === "fromList" && (
                        <div>
                            <label>価格変更: </label>
                            <select value={priceChange} onChange={(e) => setPriceChange(e.target.value)}>
                                <option value="">--選択してください--</option>
                                <option value="yes">あり</option>
                                <option value="no">なし</option>
                            </select>
                        </div>
                    )}

                    {priceChange && (
                        <div>
                            {/* Render your customization settings based on the user's selections here. */}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default CustomizationComponent;
