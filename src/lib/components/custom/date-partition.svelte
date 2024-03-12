<script lang="ts">
    export let dateString:string;
    export {dateString as date};

    let date = new Date(dateString);


    const monthMap: Record<number, string> = {
        0: "Jan", 1: "Feb", 2: "Mar", 3: "Apr", 4: "May", 5: "Jun", 6: "Jul", 7: "Aug", 8: "Sep", 9: "Oct", 10: "Nov", 11: "Dec"
    };
    const dayMap: Record<number, string> = { 
        1: "Mon", 2: "Tue", 3: "Wed", 4: "Thu", 5: "Fri", 6: "Sat", 0: "Sun"
    };

    console.log(date.getDay(), dayMap[date.getDay()])

    let datePreview = dayMap[date.getDay()] + ", " + monthMap[date.getMonth()] + " " + date.getDate();
    const dateToday = new Date();
    const dateTodayString = dayMap[dateToday.getDay()] + ", " + monthMap[dateToday.getMonth()] + " " + dateToday.getDate();
    if (dateTodayString == datePreview) {
        datePreview = "Today";
    }
</script>

<div class="w-full border-b flex justify-start">
    <div class="w-fit px-4 rounded-tl border border-b-0 rounded-tr mx-4">
        <span class="text-sm tracking-wide font-semibold">
            {datePreview}
        </span>
    </div>
</div>