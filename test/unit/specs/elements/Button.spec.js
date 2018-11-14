import { mount } from "@vue/test-utils"
import Button from "@/elements/Button.vue"

describe("elements/Button", () => {
  it("button click", () => {
    const wrapper = mount(Button)

    wrapper.find("button").trigger("click")

    expect(wrapper.emitted("click").length).toBe(1)
  })
})
