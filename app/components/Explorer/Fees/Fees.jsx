import React from "react";
import jsonOperations from "../../../../app/Context/Fees/Domain/operations.json";
import HelpContent from "../../Utility/HelpContent";
import FeesContext from "./Context";
import ModelViewTransformer from "./ViewModel/ModelViewTransformer";
import Group from "./List/Group";
import ActionButtons from "./ActionButtons";
import useFees from "./Hooks/useFees";

// let ltm_required = [5, 7, 20, 21, 34];

export default function Fees() {
    const [
        operations,
        loadOperations,
        setOperations,
        scale,
        networkPercent
    ] = useFees();

    const modelViewTransformer = new ModelViewTransformer(
        jsonOperations,
        scale,
        networkPercent / scale
    );

    const groups = modelViewTransformer.transform(operations);

    if (operations.isEmpty()) {
        return null;
    }

    return (
        <FeesContext.Provider
            value={{
                operations: operations,
                updateOperations: setOperations
            }}
        >
            <div className="grid-block vertical fees">
                <div className="grid-block small-12 shrink">
                    <div className="grid-content">
                        <HelpContent path={"components/Fees"} />
                    </div>
                </div>
                <div className="grid-block small-12">
                    <div className="grid-content list-actions">
                        <ActionButtons />
                    </div>
                </div>
                <div className="grid-block small-12">
                    <div className="grid-content">
                        {groups.valueSeq().map(group => (
                            <Group key={group.code} group={group} />
                        ))}
                    </div>
                </div>
            </div>
        </FeesContext.Provider>
    );
}
