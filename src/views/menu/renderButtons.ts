export default function renderButtons(buttons, btnClass?: string) {
  let _html = "";

  for (let i = buttons.length; i--; ) {
    const button = buttons[i];

    let genderRadio = "";
    if (button.key === "screen-reader") {
      genderRadio = `<div class="asw-flex"><label for="male" class="asw-gender-label"><span class="asw-translate">Male</span><input type="radio" id="male" name="gender" value="male" checked=""></label><label for="female" class="asw-gender-label"><span class="asw-translate">Female</span><input type="radio" id="female" name="gender" value="female"></label></div>`;
    }

    _html += `<button class="asw-btn ${
      btnClass || ""
    }" type="button" data-key="${button.key}" title="${button.label}">${
      button.icon
    }<span class="asw-translate">${button.label}</span>${genderRadio}</button>`;
  }

  return _html;
}
