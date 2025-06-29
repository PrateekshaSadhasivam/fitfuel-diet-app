function submitDetails() {
  const age = document.getElementById('age').value;
  const weight = document.getElementById('weight').value;
  const height = document.getElementById('height').value;
  if (!age || !weight || !height) {
    alert("Please fill in all fields!");
    return;
  }
  const query = `?age=${age}&weight=${weight}&height=${height}`;
  window.location.href = 'plan.html' + query;
}

function generatePlanFromQuery() {
  const urlParams = new URLSearchParams(window.location.search);
  const age = parseInt(urlParams.get('age'));
  const weight = parseInt(urlParams.get('weight'));
  const height = parseInt(urlParams.get('height'));
  if (!age || !weight || !height) return;

  const ideal = age < 18 ? 45 : age < 30 ? 55 : age < 50 ? 60 : 65;
  const overweight = weight > ideal + 4;
  const underweight = weight < ideal - 5;
  const statusText = overweight ? 'You are above your healthy weight by ' + (weight - ideal) + ' kg.' :
                    underweight ? 'You are under your healthy weight by ' + (ideal - weight) + ' kg.' :
                    'You are within your ideal weight range.';
  const reason = overweight ? 'This plan is designed to help you lose weight in a healthy way.' :
                 underweight ? 'This plan is designed to help you gain weight with nutritious meals.' :
                 'This plan will help you maintain your healthy weight.';

  const plan = {
    Breakfast: ["Yogurt + Peach", "Egg Muffin + Peaches", "Oatmeal + Berries", "Lemon Muffin + Smoothie", "Granola + Almond Milk", "Strawberry Shortcake + Eggs", "Basil Eggs + Biscuit"],
    Lunch: ["Turkey Bagel + Cream Cheese", "Tuna Salad + Crackers", "Nut Wrap + Yogurt", "Avocado Sandwich + Pickles", "Bean Dip + Tortilla", "Pizza Bagels + Veggies", "Grilled Cheese + Tomato Soup"],
    Dinner: ["Zucchini Pasta", "Herb Chicken + Caprese", "Baked Potatoes + Salad", "Quesadilla + Beans", "Scallops + Saffron Rice", "Cheddar Sandwich + Tomato Soup", "Grilled Steak + Asparagus"]
  };

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  let tableHTML = "<tr><th>Day</th><th>Breakfast</th><th>Lunch</th><th>Dinner</th></tr>";
  for (let i = 0; i < 7; i++) {
    tableHTML += `<tr><td>${days[i]}</td><td>${plan.Breakfast[i]}</td><td>${plan.Lunch[i]}</td><td>${plan.Dinner[i]}</td></tr>`;
  }

  document.getElementById("details").innerHTML = `
    <p><strong>${statusText}</strong></p>
    <p>${reason}</p>
  `;
  document.getElementById("planTable").innerHTML = tableHTML;
}
