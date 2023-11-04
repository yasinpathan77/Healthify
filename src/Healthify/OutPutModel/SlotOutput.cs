using System;
using System.Collections.Generic;

namespace Healthify.OutPutModel
{
    public class SlotOutput
    {
        public string Date { get; set; }

        public List<string> Morning { get; set; }


        public List<string> Afternoon { get; set; }


        public List<string> Evening { get; set; }
    }
}
