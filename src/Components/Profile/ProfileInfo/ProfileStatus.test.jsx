// import React from "react";
// import { create } from "react-test-renderer";
// import ProfileStatus from "./ProfileStatus";


// describe("ProfileStatus component", () => {
//     test("Status from props should be in the state", () => {
//         const component = create(<ProfileStatus status="foorball freestyle"/>);
//         const instance = component.getInstance();
//         expect(instance.state.status).toBe("foorball freestyle");
//     });

//     test("after creation span should be dispayed", async() => {
//         const component = create(<ProfileStatus status="foorball freestyle"/>);
//         const root = component.root;
//         let span = await root.findByType("span");
//         expect(span).not.toBeNull();
//     }); 

//     test("after creation input shouldn't be dispayed", () => {
//         const component = create(<ProfileStatus status="foorball freestyle"/>);
//         const root = component.root;
//         expect(async() => {
//             let input = await root.findByType("input");
//         }).toThrow();
//     }); 

//     test("after creation span should be dispayed with correct status", async() => {
//         const component = create(<ProfileStatus status="foorball freestyle"/>);
//         const root = component.root;
//         let span = await root.findByType("span");
//         expect(span.children[0]).toBe("foorball freestyle");
//     }); 


//     /// Происходит переход в эдитмоде
//     test("input should be displayed in editeMode instead of span", async() => {
//         const component = create(<ProfileStatus status="foorball freestyle"/>);
//         const root = component.root;
//         let span = await root.findByType("span");
//         span.props.onDoubleClick();
//         let input = await root.findByType("input");
//         expect(input.props.value).toBe("foorball freestyle");
//     }); 
// })