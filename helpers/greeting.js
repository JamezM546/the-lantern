export function getGreeting(hour){
    let greeting;
    if(hour < 12) greeting = "Good morning! What are you reading today?";
    else if(hour < 18) greeting = "Good afternoon! Find your next read!";
    else if(hour < 23) greeting = "Good Evening, what are you reading tonight?";
    else greeting = "Still up? Let's find something good!";
    
    return greeting;
}